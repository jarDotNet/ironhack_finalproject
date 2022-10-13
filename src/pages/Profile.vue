<template>
   <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center">
         <div class="col-md-12 col-xl-10 text-center">
            <h1
               class="fw-bolder mb-3 p-3 bg-background"
               style="
                  color: #fff;
                  background-color: #635e94ed;
                  border-radius: 5px;
               "
            >
               Profile Settings
            </h1>

        <p class="w-100 mt-2">
          Do you want to edit your personal data?
          <strong>Fill in the fields</strong> and show us your potential!
        </p>
        <form
          v-if="store.user"
          class="
            form-widget
            d-flex
            flex-column flex-lg-row
            justify-content-center
            mt-4
          "
          @submit.prevent="profileStore.updateProfile(username, website)"
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
                v-if="
                  profileStore.profile.avatar_url !== null &&
                  profileStore.profile.avatar_url !== ''
                "
                :src="`https://myirmalszrpixdsvjfdv.supabase.co/storage/v1/object/public/avatars/${profileStore.profile.avatar_url}`"
                alt="Profile photo"
                class="rounded-circle profile-image profile-image-user"
              />

              <img
                v-else
                src="../assets/defaultAvatar.png"
                alt="Profile photo"
                class="rounded-circle profile-image profile-image-default"
              />

              <div class="position-absolute avatar-img">
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png,
                    image/jpeg"
                  @change="profileStore.updatePicture"
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

            <input
              type="submit"
              class="
                btn btn-custom btn-lg btn-block btn-profile btn-submit
                w-100
                mt-4
              "
              :value="loading ? 'Loading ...' : 'Update'"
              :disabled="loading"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUpdated, ref, watch } from "vue";
import { useProfileStore } from "../store/profile";
import ValidationConstants from "../utils/ValidationConstants";
import { useUserStore, useAlertStore } from "../store/";

export default {
  created() {
    this.ValidationConstants = ValidationConstants;
  },

  setup() {
    const profileStore = useProfileStore();
    const store = useUserStore();
    const username = ref(profileStore.profile.username);
    const website = ref(profileStore.profile.website);
    const loading = ref(false);

    watch(() => {
      username.value = profileStore.profile.username;
    });

    onMounted(() => {
      profileStore.getProfile();
      console.log(profileStore.profile.avatar_url);
    });
    return {
      store,
      profileStore,
      username,
      website,
      loading,
    };
  },
};
</script>

<style scoped>
:deep(path) {
  fill: #fff;
}

.profile-title {
  color: #fff;
  background-color: #635e94ed;
  border-radius: 5px;
}

.profile-image {
  width: 250px;
  height: 250px;
  padding: 1px;
  object-fit: contain;
  box-shadow: #895cdbc2 1px 2px 6px 0px;
}

.profile-image-user {
  border: 7px solid #3d2c5b;
}

.profile-image-default {
  border: 7px solid #2f2a64;
}

.avatar-img {
  right: 60px;
  top: 170px;
}

.avatar-img input {
  display: none;
}

.avatar-img label {
  width: 60px;
  height: 60px;
  background: #2f2a64;
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

.btn-submit {
  margin-right: 8px;
}

.settings-card {
  border: none;
}

@media (min-width: 1600px) {
   .form-widget {
      margin-top: 5em !important;
   }
}
</style>
