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

const createProfileAuth = (to, from, next) => {
  const user = supabase.auth.user();

  const checkProfile = async () => {
    const { data } = await supabase
      .from("users")
      .select("name")
      .filter("id", "eq", user.id);

    if (data.length) {
      next({ name: "Home" });
    } else {
      next();
    }
  };

  checkProfile();
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
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    beforeEnter: requireNoAuth,
    meta: {
      title: "Authentication App | Login",
    },
  },
  {
    path: "/create",
    name: "CreateProfile",
    component: () =>
      import(
        /* webpackChunkName: "createProfile" */ "../views/CreateProfile.vue"
      ),
    beforeEnter: createProfileAuth,
    meta: {
      title: "Authentication App | Create Profile",
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
