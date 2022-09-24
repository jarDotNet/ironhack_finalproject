<template>
  <h2 class="mb-5">Sign In</h2>
  <form class="w-75" @submit.prevent="handleSignin">
    <div>
      <input id="email" type="email" v-model="email" placeholder="E-mail" />
    </div>
    <div>
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Password"
      />
    </div>

    <div class="d-grid">
      <button type="submit" class="btn btn-custom btn-lg btn-block mb-5">
        Sign in
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

    const handleSignin = async () => {
      try {
        // Use the Supabase provided method to handle the signin
        store.singIn({
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
      handleSignin,
    };
  },
};
</script>
