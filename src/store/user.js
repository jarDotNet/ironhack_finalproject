import { defineStore } from "pinia";
import { supabase } from "../supabase";

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
    async signUp(email, password) {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
    },
    async singIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
      this.user = user;
    },
    async sendPasswordRestEmail(email) {
      const host = window.location.protocol + "//" + window.location.host;
      const { user, error } = await supabase.auth.api.resetPasswordForEmail(
        email,
        {
          redirectTo: `${host}/auth/update-password`,
        }
      );
      if (error) throw error;
      return user;
    },
    async updatePassword(newPassword) {
      const { data, error } = await supabase.auth.update({
        password: newPassword,
      });
      if (error) throw error;
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
