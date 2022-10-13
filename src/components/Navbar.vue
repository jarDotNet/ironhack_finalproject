<template>
  <nav
    v-if="visible"
    class="navbar navbar-expand-sm navbar-expand-lg navbar-light px-5 py-3"
  >
    <div class="container-fluid">
      <a class="navbar-brand font-weight-bold" href="/">TrackLab</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavbar"
      >
        <font-awesome-icon icon="fa-solid fa-bars" />
      </button>
      <div
        class="collapse navbar-collapse justify-content-between"
        id="collapsibleNavbar"
      >
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link to="/" class="nav-link text-white">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link text-white"
              >Dashboard</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/profile" class="nav-link text-white"
              >Profile</router-link
            >
          </li>
        </ul>

        <div class="navbar-nav ml-auto gap-3 flex-row justify-content-end">
          <router-link to="/profile">
            <img
              v-if="
                profileStore.profile.avatar_url === null ||
                profileStore.profile.avatar_url === ''
              "
              alt="Profile photo"
              title="Profile"
              class="rounded-circle avatar-img"
              src="../assets/defaultAvatar.png"
            />

            <img
              v-else
              alt="Profile photo"
              title="Profile"
              class="rounded-circle avatar-img"
              :src="`https://myirmalszrpixdsvjfdv.supabase.co/storage/v1/object/public/avatars/${profileStore.profile.avatar_url}`"
            />
          </router-link>

          <button
            class="btn btn-custom btn-sm btn-block btn-profile my-0"
            @click="signOut"
            title="Log Out"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from "vue-router";
import { defineComponent, onMounted, onUpdated, ref } from "@vue/runtime-core";
import { supabase } from "../supabase";
import { useProfileStore } from "../store/profile";

export default defineComponent({
  name: "Navbar",
  props: {
    visible: {
      type: Boolean,
    },
  },
  setup() {
    const router = useRouter();
    const username = ref(null);
    const website = ref(null);
    const avatar_url = ref("");
    const profileStore = useProfileStore();

    const signOut = async () => {
      try {
        let { error } = await supabase.auth.signOut();
        if (error) throw error;
      } finally {
        router.push("/auth");
      }
    };

    onMounted(() => {
      profileStore.getProfile();
    });

    return {
      signOut,
      username,
      avatar_url,
      website,
      profileStore,
    };
  },
});
</script>

<style scoped>
:deep(path) {
  color: #fff;
}

.avatar-img {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.avatar-img {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.navbar-brand {
  font-weight: bold;
  color: #fff;
}

nav li {
  margin-right: 7px;
  border-radius: 15px;
  text-transform: lowercase;
}

.nav-link {
  padding: 2px var(--bs-nav-link-padding-x);
}

nav li:hover,
nav li.router-link-active,
nav li.router-link-exact-active {
  background-color: #6d0abe;
  border-radius: 15px 5px;
  cursor: pointer;
  transition: all 0.5s linear;
}

@media (min-width: 768px) {
  .router-link-active {
    background-color: #6d0abe;
    border-radius: 15px 5px;
  }
}
</style>
