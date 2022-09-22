<template>
  <div class="container">
    <nav v-if="isAuthenticated">
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
    console.log(store.user);
    supabase.auth.onAuthStateChange((_, session) => {
      store.user = session.user;
    });

    const isAuthenticated = computed(() => {
      return store.user !== null;
    });

    if (isAuthenticated.value) {
      router.push("/dashboard");
    } else {
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
