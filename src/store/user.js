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
    fetchUser() {
      const user = supabase.auth.user();
      this.user = user;
    },
    async signUp(credentials) {
      const { error } = await supabase.auth.signUp(credentials);
      if (error) {
        throw error;
      } else {
        useAlertStore().success("Check your email");
      }
    },
    async singIn(credentials) {
      const { user, error } = await supabase.auth.signIn(credentials);
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
