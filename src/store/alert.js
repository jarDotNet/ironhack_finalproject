import { defineStore } from "pinia";

const defaultError = "Oops, something went wrong 😬";

export const useAlertStore = defineStore({
  id: "alert",
  state: () => ({
    alert: null,
  }),
  actions: {
    success(message) {
      this.alert = { message, type: "alert-success" };
    },
    error(message = defaultError) {
      this.alert = { message, type: "alert-danger" };
    },
    clear() {
      this.alert = null;
    },
  },
});
