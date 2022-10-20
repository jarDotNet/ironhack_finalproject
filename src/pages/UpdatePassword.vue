<template>
  <div class="main-container">
    <div class="main container-sm">
      <img
        src="../assets/Setup-Wizard-pana.svg"
        alt="woman using her computer"
        class="img-box"
      />
      <div class="form-signup">
        <h2 class="mb-5 text-white">Change Password</h2>
        <form class="w-75" @submit.prevent="handlePasswordUpdate()">
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
              id="toggleNewPassword"
              @click="toggleNewPassword"
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
            <button type="submit" class="btn btn-custom btn-lg btn-block mb-3">
              Update Password
            </button>
          </div>
        </form>

        <div class="footer-signup pt-2" v-if="passwordUpdatedSuccess">
          <button
            class="btn btn-link text-capitalize text-dark text-form mb-2"
            @click="$router.push('/')"
          >
            Go to Home Page
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore, useAlertStore } from "../store/";
import { togglePassword } from "../utils/TogglePassword";

const password = ref("");
const passwordConfirmed = ref("");
const passwordUpdatedSuccess = ref(false);
const store = useUserStore();
const alertStore = useAlertStore();

const toggleNewPassword = () => {
  const password = document.querySelector("#password");
  const icon = document.querySelector("#toggleNewPassword");

  togglePassword(password, icon);
};

const toggleConfirmPassword = () => {
  const password = document.querySelector("#passwordConfirmed");
  const icon = document.querySelector("#toggleConfirmPassword");

  togglePassword(password, icon);
};

const handlePasswordUpdate = async () => {
  if (password.value === passwordConfirmed.value) {
    try {
      await store.updatePassword(password.value);
      alertStore.success("Password successfully updated!");
      passwordUpdatedSuccess.value = true;
    } catch (error) {
      alertStore.error(error.message);
    }
  } else {
    alertStore.error("Password doesn't match, please try again");
  }
};
</script>

<style scoped>
@import "../assets/auth.css";

form i {
  margin-left: -30px;
  cursor: pointer;
}
</style>
