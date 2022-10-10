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
          <a href="/profile">
            <img
              src="../assets/defaultAvatar.png"
              alt="Profile
            photo"
              class="rounded-circle"
              style="width: 30px; height: 30px; object-fit: contain"
              v-if="avatar_url === ''"
            />

            <img
              :src="`https://myirmalszrpixdsvjfdv.supabase.co/storage/v1/object/public/avatars/${avatar_url}`"
              alt="Profile
            photo"
              class="rounded-circle"
              title="Profile"
              style="width: 30px; height: 30px; object-fit: contain"
              v-else
            />
          </a>

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
import { useUserStore } from "../store/user";

export default defineComponent({
  name: "Navbar",
  props: {
    visible: {
      type: Boolean,
    },
  },
  setup() {
    const router = useRouter();
    const store = useUserStore();
    const username = ref(null);
    const website = ref(null);
    const avatar_url = ref("");

    const signOut = async () => {
      try {
        let { error } = await supabase.auth.signOut();
        if (error) throw error;
      } finally {
        router.push("/");
      }
    };

    async function getProfile() {
      try {
        let { data, error, status } = await supabase
          .from("profiles")
          .select(`username, website, avatar_url`)
          .eq("id", store.user.id)
          .single();

        if (error && status !== 406) throw error;

        if (data) {
          username.value = data.username;
          website.value = data.website;
          avatar_url.value = data.avatar_url;
        }
      } catch {}
    }

    onMounted(() => {
      getProfile();
    });

    onUpdated(() => {
      getProfile();
    });

    return {
      signOut,
      username,
      avatar_url,
      website,
    };
  },
});
</script>

<style scoped>
:deep(path) {
  color: #fff;
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

.router-link-active {
  background-color: #6d0abe;
  border-radius: 15px 5px;
}
</style>
