import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore, useAlertStore } from "../store/";

const loading = ref(true);

export const useProfileStore = defineStore({
  id: "profile",
  state: () => ({
    profile: {
      username: null,
      website: null,
      avatar_url: null,
    },
  }),
  actions: {
    async getProfile() {
      try {
        const store = useUserStore();

        loading.value = true;

        let { data, error, status } = await supabase
          .from("profiles")
          .select(`username, website, avatar_url`)
          .eq("id", store.user.id)
          .single();

        if (error && status !== 406) throw error;

        if (data) {
          this.profile.username = data.username;
          this.profile.website = data.website;
          this.profile.avatar_url = data.avatar_url;
        }
      } catch (error) {
        this.handleError(error, error.message);
      } finally {
        loading.value = false;
      }
    },

    async updateProfile(username, website) {
      try {
        const store = useUserStore();
        loading.value = true;

        const updates = {
          id: store.user.id,
          username: username,
          website: website,
          avatar_url: this.profile.avatar_url,
          updated_at: new Date(),
        };

        let { error } = await supabase.from("profiles").upsert(updates, {
          returning: "minimal", // Don't return the value after inserting
        });

        if (error) throw error;

        useAlertStore().success("Profile updated!");
      } catch (error) {
        console.log(error);
        this.handleError(error, error.message);
      } finally {
        loading.value = false;
      }
    },

    async updatePicture() {
      const store = useUserStore();
      try {
        const file = event.target.files[0];
        const filePath = file.name + Math.random() * 1000000000000000;

        if (this.profile.avatar_url !== null) {
          const { data, error } = await supabase.storage
            .from("avatars")
            .remove([`${this.profile.avatar_url}`]);
        }
        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(filePath, file);

        if (error) {
          this.handleError(error);
        } else {
          if (
            this.profile.username === null &&
            (this.profile.avatar_url === null || this.profile.avatar_url === "")
          ) {
            const updates = {
              id: store.user.id,
              username: null,
              website: null,
              avatar_url: filePath,
              updated_at: new Date(),
            };
            let { error } = await supabase.from("profiles").upsert(updates, {
              returning: "minimal", // Don't return the value after inserting
            });
            console.log(error);
          } else {
            const { error } = await supabase
              .from("profiles")
              .update({ avatar_url: filePath })
              .eq("id", store.user.id);
          }
          this.profile.avatar_url = filePath;
          error
            ? this.handleError(error)
            : useAlertStore().success("Avatar updated!");
        }
        return filePath;
      } catch (error) {
        //handleError(error, error.message);
        console.log(error);
      }
    },

    handleError(error, message) {
      message ? useAlertStore().error(message) : useAlertStore().error();
    },
  },
});
