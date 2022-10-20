import { createRouter, createWebHistory } from "vue-router";
import { useAlertStore } from "../store/alert";
import { supabase } from "../supabase";
import HomeView from "../pages/Home.vue";
import NotFound from "../pages/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    meta: { requiresAuth: true },
    component: HomeView,
  },
  {
    path: "/auth",
    name: "auth",
    meta: { requiresAuth: false },
    component: () => import("../pages/Auth.vue"),
  },
  {
    path: "/auth/reset-password",
    name: "ResetPassword",
    meta: { requiresAuth: false },
    component: () => import("../pages/ResetPassword.vue"),
  },
  {
    path: "/auth/update-password",
    name: "UpdatePassword",
    meta: { requiresAuth: false },
    component: () => import("../pages/UpdatePassword.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { requiresAuth: true },
    component: () => import("../pages/Profile.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: { requiresAuth: true },
    component: () => import("../pages/Dashboard.vue"),
  },
  {
    path: "/404",
    name: "NotFound",
    meta: { requiresAuth: false },
    component: NotFound,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: { requiresAuth: false },
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

router.beforeEach(async (to) => {
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();

  // check if this route requires auth
  const user = supabase.auth.user();
  if (user) {
    if (to.path.includes("/auth/update-password")) {
      return { name: "UpdatePassword" };
    }

    if (to.path.includes("/auth")) {
      return { name: "home" };
    }
  }
  if (!user && to.meta.requiresAuth) {
    return {
      path: "/auth",
      // save the location we were at to come back later
      //query: { redirect: to.fullPath },
    };
  }
});

export default router;
