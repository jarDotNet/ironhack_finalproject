<template>
  <div>
    <h2>Sign up for an account</h2>
    <form @submit.prevent="handleSignup">
      <div>
        <input id="email" type="email" v-model="email" placeholder="E-mail" />
      </div>
      <div>
        <input id="password" type="password" v-model="password" placeholder="Password" />
      </div>
      <div>
        <button type="submit">Sign up</button>
      </div>
    </form>
  </div>
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
