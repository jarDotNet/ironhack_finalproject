<template>
  <div id="not-found-container">
    <main class="bsod container">
      <h1 class="neg title"><span class="bg">Error - 404</span></h1>
      <p>
        The page you are looking for might have been removed, had its name
        changed or is temporarily unavailable, to continue:
      </p>
      <p>
        * Go back.<br />
        * Return to our homepage.
      </p>
      <nav class="not-found-nav">
        <a href="#" @click="$router.go(-1)">back</a>
        &nbsp;|&nbsp;
        <router-link to="/">homepage</router-link>
      </nav>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style scoped>
@import "https://fonts.googleapis.com/css?family=VT323";

* {
  color: #0414a7;
  font-family: "VT323", monospace;
  background: #0414a7;
}

h1,
h2,
h3,
h4,
p,
a,
.not-found-nav,
#not-found-container {
  color: #e0e2f4;
}

p,
#not-found-container {
  font: normal 25px/1.5rem "VT323", monospace;
}
h1 {
  font: normal 2.75rem/1.05em "VT323", monospace;
}
h2 {
  font: normal 2.25rem/1.25em "VT323", monospace;
}
h3 {
  font: lighter 1.5rem/1.25em "VT323", monospace;
}
h4 {
  font: lighter 1.125rem/1.2222222em "VT323", monospace;
}

#not-found-container {
  position: absolute;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  top: 70px;
  bottom: 0;
  width: 98%;
}

.container {
  width: 90%;
  margin: auto;
  max-width: 640px;
}

.bsod {
  padding-top: 10%;
}

.bsod .neg {
  text-align: center;
  color: #0414a7;
}

.bsod .neg .bg {
  background: #aaa;
  padding: 0 15px 2px 13px;
}

.bsod .title {
  margin-bottom: 50px;
}

.bsod .not-found-nav {
  margin-top: 35px;
  text-align: center;
}

.bsod .not-found-nav a {
  text-decoration: none;
  padding: 0 9px 2px 8px;
}

.bsod .not-found-nav a:hover:hover,
.bsod .not-found-nav a:focus {
  background: #aaa;
  color: #0414a7;
}
</style>