<template>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center">
      <h1
        class="m-3 text-dark text-center card-title-text"
        style="font-weight: bold"
      >
        Profile Settings
      </h1>

      <div class="col-md-12 col-xl-10">
        <form
          class="
            form-widget
            d-flex
            flex-column flex-lg-row
            justify-content-center
            mt-5
          "
          @submit.prevent="updateProfile"
        >
          <div
            class="
              col-sm-12 col-md-4 col-xl-4
              p-2
              justify-content-center
              text-center
            "
          >
            <h2 class="text-dark m-4">Hey, nice work!</h2>

            <div class="position-relative">
              <img
                v-if="avatar_url !== ''"
                :src="`https://myirmalszrpixdsvjfdv.supabase.co/storage/v1/object/public/avatars/${avatar_url}`"
                alt="Profile photo"
                class="rounded-circle"
                style="
                  width: 250px;
                  height: 250px;
                  padding: 1px;
                  object-fit: contain;
                  border: 7px solid #3d2c5b;
                  box-shadow: #895cdbc2 1px 2px 6px 0px;
                "
              />
              <img
                v-else
                src="../assets/defaultAvatar.png"
                alt="Profile photo"
                class="rounded-circle"
                style="
                  width: 250px;
                  height: 250px;
                  padding: 1px;
                  object-fit: contain;
                  border: 7px solid #3d2c5b;
                  box-shadow: #895cdbc2 1px 2px 6px 0px;
                "
              />

              <div
                class="position-absolute avatar-img"
                style="right: 60px; top: 170px"
              >
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png,
                    image/jpeg"
                  @change="updatePicture()"
                />
                <label
                  for="avatar"
                  title="Update Avatar"
                  class="change-avatar rounded-circle"
                ></label>
              </div>
            </div>
          </div>

          <div
            class="
              col-sm-12 col-md-8 col-xl-8
              px-5
              align-self-center
              text-start
            "
          >
            <label for="username" class="label-text text-capitalize"
              >Name</label
            >
            <div class="inputfield">
              <input id="username" type="text" v-model="username" />
            </div>

            <label for="email" class="label-text text-capitalize">Email</label>
            <div class="inputfield">
              <input
                id="email"
                type="email"
                :value="store.user.email"
                disabled
                required
                :pattern="ValidationConstants.EMAIL_PATTERN"
              />
            </div>

            <label for="website" class="label-text text-capitalize"
              >Website</label
            >
            <div class="inputfield">
              <input
                id="website"
                type="website"
                v-model="website"
                pattern="https?://.+"
              />
            </div>

            <div class="d-flex flex-row my-4 justify-content-between">
              <input
                type="submit"
                class="btn btn-custom btn-lg btn-block btn-profile w-75"
                style="margin-right: 8px"
                :value="loading ? 'Loading ...' : 'Update'"
                :disabled="loading"
              />

              <button
                class="btn btn-custom-secondary btn-lg btn-block btn-profile"
                @click="signOut"
                :disabled="loading"
                title="Log Out"
              >
                <font-awesome-icon
                  icon="fa-solid fa-arrow-right-from-bracket"
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from "../supabase";
import { useUserStore } from "../store/user";
import { onMounted, ref } from "vue";
import ValidationConstants from "../utils/ValidationConstants";

export default {
  created() {
    this.ValidationConstants = ValidationConstants;
  },
  setup() {
    const loading = ref(true);
    const username = ref("");
    const website = ref("");
    const avatar_url = ref("");
    const store = useUserStore();

    async function getProfile() {
      try {
        loading.value = true;

        let { data, error, status } = await supabase
          .from("profiles")
          .select(`username, website, avatar_url`)
          .eq("id", store.user.id)
          .single();

        if (error && status !== 406) throw error;

        if (data) {
          username.value = data.username;
          website.value = data.website;
          avatar_url.value = data.avatar_url;
        }
      } catch (error) {
        alert(error.message);
      } finally {
        loading.value = false;
      }
    }

    async function updateProfile() {
      try {
        loading.value = true;

        const updates = {
          id: store.user.id,
          username: username.value,
          website: website.value,
          avatar_url: avatar_url.value,
          updated_at: new Date(),
        };

        let { error } = await supabase.from("profiles").upsert(updates, {
          returning: "minimal", // Don't return the value after inserting
        });

        console.log(error);

        if (error) throw error;
      } catch (error) {
        alert(error.message);
      } finally {
        loading.value = false;
      }
    }

    async function updatePicture() {
      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = store.user.email + "." + fileExt;
      const { error } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);
      if (error) {
        console.log(error);
      } else {
        const { error } = await supabase
          .from("profiles")
          .update({ avatar_url: filePath })
          .eq("id", store.user.id);
        if (error) {
          console.log(error);
        } else {
          alert("profile actualizado");
        }
      }
      return filePath;
    }

    async function signOut() {
      try {
        loading.value = true;
        let { error } = await supabase.auth.signOut();
        if (error) throw error;
      } catch (error) {
        alert(error.message);
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      getProfile();
    });

    return {
      store,
      loading,
      username,
      website,
      avatar_url,

      updateProfile,
      updatePicture,
      signOut,
    };
  },
};
</script>

<style>
.avatar-img input {
  display: none;
}

.avatar-img label {
  width: 60px;
  height: 60px;
  background: #3d2c5b;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}
.avatar-img label:hover {
  background: #79629f;
}
.avatar-img input + label:after {
  content: "\f382";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-size: 24px;
  color: #fff;
  position: absolute;
  top: 15px;
  left: 0;
  right: 0;
  -webkit-animation: glide 0.9s ease-in-out alternate infinite;
}

@-webkit-keyframes glide {
  from {
    left: 0px;
    top: 18px;
  }
  to {
    left: 0px;
    top: 12px;
  }
}

.btn-profile {
  margin: 0;
}

.settings-card {
  border: none;
}
</style>