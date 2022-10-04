<template>
   <nav
      v-if="visible"
      class="navbar navbar-expand-sm navbar-expand-lg navbar-light px-5 py-3"
   >
      <div class="container-fluid">
         <a class="navbar-brand font-weight-bold" href="/">TrackLab</a>
         <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
         >
            <font-awesome-icon icon="fa-solid fa-bars" />
         </button>
         <div
            class="collapse navbar-collapse justify-content-between"
            id="collapsibleNavbar"
         >
            <ul class="navbar-nav">
               <li class="nav-item active">
                  <router-link to="/" class="nav-link text-white"
                     >Home</router-link
                  >
               </li>
               <li class="nav-item">
                  <router-link to="/dashboard" class="nav-link text-white"
                     >Dashboard</router-link
                  >
               </li>
               <li class="nav-item">
                  <router-link to="/profile" class="nav-link text-white"
                     >Profile</router-link
                  >
               </li>
               <li class="nav-item">
                  <router-link to="/404" class="nav-link text-white"
                     >404</router-link
                  >
               </li>
            </ul>

            <div class="navbar-nav ml-auto gap-3 flex-row justify-content-end">
               <a href="/profile">
                  <img
                     src="../assets/defaultAvatar.png"
                     alt="Profile photo"
                     class="rounded-circle"
                     style="width: 30px; height: 30px; object-fit: contain"
               /></a>

               <button
                  class="btn btn-custom btn-sm btn-block btn-profile my-0"
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
      </div>
   </nav>
</template>

<!-- <script>
export default {
    name: 'Navbar',
    props: {
        isAuthenticated: Boolean
  },
};
</script> -->
<script setup>
const props = defineProps({
   visible: Boolean,
});
</script>

<style scoped>
:deep(path) {
   color: #fff;
}
.navbar-brand {
   font-weight: bold;
   color: #fff;
}

nav li {
   margin-right: 7px;
   border-radius: 15px;
   text-transform: lowercase;
}

.nav-link {
   padding: 2px var(--bs-nav-link-padding-x);
}

nav li:hover,
nav li.router-link-active,
nav li.router-link-exact-active {
   background-color: #6d0abe;
   border-radius: 15px 5px;
   cursor: pointer;
   transition: all 0.5s linear;
}

.router-link-active {
   background-color: #6d0abe;
   border-radius: 15px 5px;
}
</style>
