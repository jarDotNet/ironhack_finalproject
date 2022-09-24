<template>
  <div class="main-container">
    <div class="main container-sm">
      <div class="form-signup">
        <sign-up v-if="isSignUp" />
        <sign-in v-else />

        <div class="footer-signup pt-2">
          <button
            class="btn btn-link text-capitalize text-dark text-form mb-2"
            @click="isSignUp = !isSignUp"
          >
            {{
              isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account yet? Sign Up"
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import SignUp from "../components/SignUp.vue";
import SignIn from "../components/SignIn.vue";
export default {
  components: { SignUp, SignIn },
  setup() {
    const isSignUp = ref(true);

    return {
      isSignUp,
    };
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  height: 90vh;
}

.main {
  width: 345px;
  height: 400px;
  border-radius: 13px;
  box-shadow: 5px 20px 50px #000;
  justify-content: center;
  align-self: center;
  padding: 0;
  position: relative;
}

.form-signup {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.footer-signup {
  background: #eee;
  border-radius: 60% / 10%;
  background: #e0dede;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-top: 5px;
  height: 40px;
  transition: height 2.6s;
}

.footer-signup:hover {
  height: 70px;
}

.text-form {
  text-decoration: none;
}
</style>
