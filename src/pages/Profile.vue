<template>
  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-10 col-xl-8 text-center">
          <div class="card" style="border-radius: 15px">
            <div class="card-body text-center">
              <form class="form-widget d-flex flex-row" @submit.prevent="updateProfile">


                <div class="col-md-4 col-xl-4 p-3 align-self-center">

                  <h1 class="text-dark mb-5">¡Hello!</h1>

                  <div class="position-relative">
                    <img
                    v-if="avatar_url !== ''"
                    :src="`https://myirmalszrpixdsvjfdv.supabase.co/storage/v1/object/public/avatars/${avatar_url}`"
                    alt="Profile photo"
                    style="width: 160px"
                    class="w-100"
                  />
                  <img
                    v-else
                    src="../assets/defaultAvatar.png"
                    alt="Profile photo"
                    class="rounded-circle"
                    style="width: 160px; height: 160px; padding: 1px; object-fit: contain; border: 7px solid #3d2c5b; box-shadow: #895cdbc2 1px 2px 6px 0px;"
                  />

                  <div class="position-absolute avatar-img" style="right:20px; top: 110px">
                    <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/png,
                  image/jpeg"
                    @change="updatePicture()"
                  />
                  <label for="avatar" class="change-avatar rounded-circle"></label>
                  </div>

                  </div>
                  
                  
              
                </div>
                
                <div class="col-md-8 col-xl-8 p-5 align-self-center">
                
                  <label for="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    :value="store.user.email"
                    disabled
                    required
                    :pattern="ValidationConstants.EMAIL_PATTERN"
                  />
                
                  <label for="username">Name</label>
                  <input id="username" type="text" v-model="username" />
                
                  <label for="website">Website</label>
                  <input
                    id="website"
                    type="website"
                    v-model="website"
                    pattern="https?://.+"
                  />
                
                  <input
                    type="submit"
                    class="button primary block"
                    :value="loading ? 'Loading ...' : 'Update'"
                    :disabled="loading"
                  />
                
                  <button
                    class="button block"
                    @click="signOut"
                    :disabled="loading"
                  >
                    Sign Out
                  </button>

                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from "../supabase";
import { useUserStore } from "../store/user";
import { onMounted, ref } from "vue";
import ValidationConstants from "../enums/ValidationConstants";

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

<style scoped>
  .avatar-img input{
    display:none;
  }

  .avatar-img label {
  width: 40px;
  height: 40px;
  background: #3D2C5B;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
}
.avatar-img label:hover {
  background: #f1f1f1;
  border-color: #d6d6d6;
}
.avatar-img input + label:after {
  content: "\f382";
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  font-size: 16px;
  color: #fff;
  position: absolute;
  top: 15px;
  left: 0;
  right: 0;
  -webkit-animation:glide 0.9s ease-in-out alternate infinite;
}

@-webkit-keyframes glide {
    from {left:0px; top:15px;}
    to {left:0px; top:10px;}
}

</style>