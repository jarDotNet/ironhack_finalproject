<template>

<div class="container p-3">
  
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
};
</script>

<style>
</style>
