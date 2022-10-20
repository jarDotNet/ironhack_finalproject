<template>
  <div v-if="!store.isAuthenticated" class="main-container">
    <div class="main container-sm">
      <img
        src="../assets/Setup-Wizard-pana.svg"
        alt="woman using her computer"
        class="img-box"
      />
      <div class="form-signup">
        <sign-in v-if="isSignIn" />
        <sign-up v-else />

        <div class="footer-signup pt-2">
          <button
            class="btn btn-link text-capitalize text-dark text-form mb-2"
            @click="isSignIn = !isSignIn"
          >
            {{
              isSignIn
                ? "Don't have an account yet? Sign Up"
                : "Already have an account? Sign In"
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import { SignIn, SignUp } from "../components/";

export default {
  components: { SignUp, SignIn },
  setup() {
    const isSignIn = ref(true);
    const router = useRouter();
    const store = useUserStore();

    onMounted(() => {
      if (store.isAuthenticated) {
        router.go(-1);
      }
    });

    return {
      store,
      isSignIn,
    };
  },
};
</script>

<style scoped>
@import "../assets/auth.css";
</style>
