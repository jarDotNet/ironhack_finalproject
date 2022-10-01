<template>
  <div class="background" :class="{ backgroundLog: isSignIn }">
    <Navbar :visible="isAuthenticated" />
    <Alert />
    <!-- <Auth v-else /> -->
    <div 
    :class="{ cardBck: !isSignIn, cardErr: isErr }" 
    style="width: 98%; margin: auto; border-top-left-radius: 2rem; border-top-right-radius: 2rem;"
    >
        <router-view />
    </div>

  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "./supabase";
import { useUserStore } from "./store/user";
import Navbar from "./components/Navbar.vue";
import Auth from "./components/Auth.vue";
import Alert from "./components/Alert.vue";
import Profile from "./pages/Profile.vue";
export default {
  components: {
    Auth,
    Navbar,
    Alert,
    Profile,
  },
  setup() {
    const router = useRouter();
    const store = useUserStore();
    store.user = supabase.auth.user();
    supabase.auth.onAuthStateChange((_, session) => {
      store.user = session.user;
    });
    const isAuthenticated = computed(() => {
      return store.user !== null;
    });
    if (!isAuthenticated.value) {
      router.push("/auth");
    }
    return {
      isAuthenticated,
    };
  },
  computed: {
    isSignIn() {
      return this.$route.path === "/auth";
    },
    isErr() {
      return this.$route.path === "/404";
    },
  },
};
</script>

<style scoped>
.background {
  height: 100vh;
  width: 100vw;
  background: #9f8cae;
}
.backgroundLog {
  background: linear-gradient(to bottom, #0f0c2b, #2f2a64, #272745);
  position: relative;
}
.backgroundLog:before {
  content: "";
  background-image: url("./assets/background.png");
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.1;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}

.cardBck{
  background-color: #fff;
  min-height: calc(100vh - 62px);
}

.cardErr{
  background-color: rgb(40, 69, 31);
  min-height: calc(100vh - 62px);
  width: 100vh;
}
</style>