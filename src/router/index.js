import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import { supabase } from "@/supabase/config";

// auth guard
const requireAuth = (to, from, next) => {
  const user = supabase.auth.user();

  if (!user) {
    next({ name: "Signup" });
  } else {
    next();
  }
};

const requireNoAuth = (to, from, next) => {
  const user = supabase.auth.user();

  if (user) {
    next({ name: "Home" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: requireAuth,
    meta: {
      title: "Authentication App | Personal Info",
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/Signup.vue"),
    beforeEnter: requireNoAuth,
    meta: {
      title: "Authentication App | Signup",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;
