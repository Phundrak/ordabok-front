import { createRouter, createWebHistory } from "vue-router";
import { useAppwrite } from "../stores/appwrite";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/new-language",
      name: "new-language",
      component: () => import("../views/NewLanguageView.vue"),
    },
  ],
});

router.beforeEach(async (to, _from) => {
  const store = useAppwrite();
  console.debug("Redirecting user to login?");
  if (to.name === "home" && !store.connected) {
    console.debug("Redirecting to login...");
    return { name: "login" };
  }
  if ((to.name === "login" || to.name === "register") && store.connected) {
    return { name: "home" };
  }
});

export default router;
