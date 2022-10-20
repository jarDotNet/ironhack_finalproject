<template>
  <h2 class="mt-3 text-white">Sign Up</h2>
  <form class="w-75" @submit.prevent="handleSignup">
    <div>
      <input
        id="email"
        type="email"
        autoComplete="email"
        v-model="email"
        placeholder="E-mail"
        required
        :pattern="ValidationConstants.EMAIL_PATTERN"
      />
    </div>
    <div class="text-start">
      <input
        id="password"
        type="password"
        autoComplete="new-password"
        v-model="password"
        placeholder="Password"
        required
      />
      <i
        class="bi bi-eye-slash"
        id="togglePassword"
        @click="toggleSignOutPassword"
      ></i>
    </div>
    <div class="text-start">
      <input
        id="passwordConfirmed"
        type="password"
        autoComplete="new-password"
        v-model="passwordConfirmed"
        placeholder="Confirm password"
        required
      />
      <i
        class="bi bi-eye-slash"
        id="toggleConfirmPassword"
        @click="toggleConfirmPassword"
      ></i>
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
import { useUserStore, useAlertStore } from "../store/";
import { togglePassword } from "../utils/TogglePassword";
import ValidationConstants from "../utils/ValidationConstants";

export default {
  created() {
    this.ValidationConstants = ValidationConstants;
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const store = useUserStore();
    const passwordConfirmed = ref("");
    const alertStore = useAlertStore();

    const toggleSignOutPassword = () => {
      const password = document.querySelector("#password");
      const icon = document.querySelector("#togglePassword");

      togglePassword(password, icon);
    };

    const toggleConfirmPassword = () => {
      const password = document.querySelector("#passwordConfirmed");
      const icon = document.querySelector("#toggleConfirmPassword");

      togglePassword(password, icon);
    };

    const handleSignup = async () => {
      if (password.value === passwordConfirmed.value) {
        try {
          // Use the Supabase provided method to handle the signup
          await store.signUp(email.value, password.value);
          useAlertStore().success(
            `Confirm your email to finishing registering: ${email.value}`
          );
        } catch (error) {
          alertStore.error(error.message);
        }
      } else {
        alertStore.error("Password doesn't match, please try again");
      }
    };

    return {
      email,
      password,
      store,
      passwordConfirmed,
      toggleSignOutPassword,
      toggleConfirmPassword,
      handleSignup,
    };
  },
};
</script>

<style scoped>
form i {
  margin-left: -30px;
  cursor: pointer;
}
</style>
