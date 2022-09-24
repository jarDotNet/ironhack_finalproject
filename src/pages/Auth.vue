<template>
<div class="main-container">

  <div class="main container-sm"> 
    <sign-up v-if="isSignUp" />
    <sign-in v-else />
    <button @click="isSignUp = !isSignUp">
      {{
        isSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account yet? Sign Up"
      }}
    </button>
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
  .main-container{
    display: flex;
    height:90vh;
  }

  
  .main{
	width: 345px;
	height: 500px;
	border-radius: 13px;
	box-shadow: 5px 20px 50px #000;
  justify-content: center;
  align-self: center;
}
</style>
