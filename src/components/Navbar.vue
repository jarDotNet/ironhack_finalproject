<template>
   <nav v-if="visible" class="navbar navbar-expand-lg navbar-light px-5 py-3">
      <div class="mx-3">
         <a class="navbar-brand font-weight-bold" href="/">TrackLab</a>
      </div>
      <button
         class="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarNavDropdown"
         aria-controls="navbarNavDropdown"
         aria-expanded="false"
         aria-label="Toggle navigation"
      >
         <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse mx-5" id="navbarNavDropdown">
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
