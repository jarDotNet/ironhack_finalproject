<template>

  <div class="background" :class="{ backgroundLog: isSignIn }">

      <nav v-if="isAuthenticated">
        <router-link to="/">Home</router-link> |
        <router-link to="/dashboard">Dashboard</router-link> |
        <router-link to="/profile">Profile</router-link> |
        <router-link to="/404">404</router-link>
      </nav>
      <Alert />
      <!-- <Auth v-else /> -->
      <router-view />

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

<style>
  .background {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to bottom, #0f0c2b, #2f2a64, #272745);
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

</style>
