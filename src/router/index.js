import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../App.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import(/* webpackChunkName: 'auth' */ "../pages/Auth.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: 'profile' */ "../pages/Profile.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: 'dashboard' */ "../pages/Dashboard.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;
