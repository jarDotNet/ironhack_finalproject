<template>

  <div class="background" :class="{ backgroundLog: isSignIn }">

    <nav v-if="isAuthenticated" class="navbar navbar-expand-lg navbar-light px-5 py-3">
      <div class="mx-3">
        <a class="navbar-brand font-weight-bold" href="/">TrackLab</a>
      </div>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse mx-5" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <router-link to="/" class="nav-link text-white">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/dashboard" class="nav-link text-white">Dashboard</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/profile" class="nav-link text-white">Profile</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/404" class="nav-link text-white">404</router-link>
      </li>
    </ul>
  </div>
</nav>

      <Alert />
      <!-- <Auth v-else /> -->
      <div class="vh-100" :class="{ cardBck: !isSignIn }" style="width: 98%; margin: auto; border-top-left-radius: 2rem; border-top-right-radius: 2rem;">
        <router-view />
      </div>

  </div>

</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "./supabase";
import { useUserStore } from "./store/user";
import Auth from "./components/Auth.vue";
import Alert from "./components/Alert.vue";
import Profile from "./pages/Profile.vue";

export default {
  components: {
    Auth,
    Alert,
    Profile,
  },
  setup() {
    const router = useRouter();
    const store = useUserStore();

    store.user = supabase.auth.user();
    supabase.auth.onAuthStateChange((_, session) => {
      store.user = session.user;
    });

    const isAuthenticated = computed(() => {
      return store.user !== null;
    });

    if (!isAuthenticated.value) {
      router.push("/auth");
    }

    return {
      isAuthenticated,
    };
  },
  computed: {
    isSignIn() {
      return this.$route.path === '/auth';
    }
  }
};
</script>

<style scoped>
  .background {
  height: 100vh;
  width: 100vw;
  background: #9f8cae;
}

.backgroundLog {
  background: linear-gradient(to bottom, #0f0c2b, #2f2a64, #272745);
  position:relative;
}

.backgroundLog:before {
  content: "";
  background-image: url('./assets/background.png');
  background-repeat: no-repeat;
  background-size:cover;
  opacity: 0.1;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}

.navbar{
  background-color:#9f8cae;
}

.navbar-brand{
  font-weight: bold;
  color: #fff;
}

nav li{
  margin-right: 7px;
  border-radius: 15px;
  text-transform: lowercase;
}

.nav-link{
  padding: 2px var(--bs-nav-link-padding-x);
}

nav li:hover,
 nav li.router-link-active,
 nav li.router-link-exact-active {
   background-color: #6d0abe;
   border-radius: 15px;
   cursor: pointer;
   transition: all 0.5s linear;
 }

 .router-link-active{
  background-color: #6d0abe;
   border-radius: 15px;
 }

.cardBck{
  background-color: #fff;
}
</style>
