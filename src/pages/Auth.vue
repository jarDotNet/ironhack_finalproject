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
.main-container {
  display: flex;
  height: 90vh;
  position: relative;
}

.main-container ::placeholder {
  color: #ffffffea;
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
  background-color: #7f00ff1a;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
}

.img-box {
  background: url("../assets/Setup-Wizard-pana.svg");
  width: 250px;
  position: absolute;
  top: -230px;
  right: 195px;
  bottom: 0px;
  left: 0px;
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
