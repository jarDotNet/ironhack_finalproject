import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useAlertStore } from "./alert";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => state.user !== null,
  },
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async signUp(credentials) {
      const { user, session, error } = await supabase.auth.signUp(credentials);
      if (error) throw error;
      else {
        alert("Check your email");
      }
    },
    async singIn(credentials) {
      const { user, session, error } = await supabase.auth.signIn(credentials);
      if (error) throw error;
      this.user = user;
    },
    persist: {
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },
  },
});
