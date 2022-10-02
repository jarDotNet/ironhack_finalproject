<template>
   <h2 class="mb-5 text-white">Sign Up</h2>
   <form class="w-75" @submit.prevent="handleSignup">
      <div>
         <input
            id="email"
            type="email"
            v-model="email"
            placeholder="E-mail"
            required
            :pattern="ValidationConstants.EMAIL_PATTERN"
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
      <div>
         <input
            id="passwordConfirmed"
            type="password"
            v-model="passwordConfirmed"
            placeholder="Confirm password"
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
import { useAlertStore } from "../store/alert";
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

      const handleSignup = async () => {
         if (password.value === passwordConfirmed.value) {
            try {
               // Use the Supabase provided method to handle the signup
               await store.signUp({
                  email: email.value,
                  password: password.value,
               });
            } catch (error) {
               alert(error.error_description || error.message);
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
         handleSignup,
      };
   },
};
</script>

<style scoped></style>
