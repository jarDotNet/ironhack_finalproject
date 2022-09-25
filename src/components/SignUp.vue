<template>
  <h2 class="mb-5">Sign Up</h2>
  <form class="w-75" @submit.prevent="handleSignup">
    <div>
      <input
        id="email"
        type="email"
        v-model="email"
        placeholder="E-mail"
        required
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
      />
    </div>
    <div>
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
    </div>

    <div class="d-grid">
      <button type="submit" class="btn btn-custom btn-lg btn-block mb-5">
        Sign up
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useUserStore } from "../store/user";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const store = useUserStore();

    const handleSignup = async () => {
      try {
        // Use the Supabase provided method to handle the signup
        /*store.signUp({
          email: email.value,
          password: password.value,
        });*/
        store.signUp({
          email: email.value,
          password: password.value,
        });
      } catch (error) {
        alert(error.error_description || error.message);
      }
    };

    return {
      email,
      password,
      store,
      handleSignup,
    };
  },
};
</script>

<style scoped>
</style>
