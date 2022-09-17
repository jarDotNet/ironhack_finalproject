<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <nav v-if="store.user">
      <router-link to="/">Home</router-link> |
      <router-link to="/profile">Profile</router-link>
    </nav>
    <!-- <Auth v-else /> -->
    <router-view />
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { store } from "./store/auth";
import { supabase } from "./supabase";
import Auth from "./components/Auth.vue";
import Profile from "./pages/Profile.vue";

export default {
  components: {
    Auth,
    Profile,
  },

  setup() {
    const router = useRouter();

    store.user = supabase.auth.user();
    supabase.auth.onAuthStateChange((_, session) => {
      store.user = session.user;
    });

    // const isAuthenticated = computed(() => {
    //   return store.user;
    // });

    if (store.user) {
      router.push("/dashboard");
    } else {
      router.push("/auth");
    }

    return {
      store,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>