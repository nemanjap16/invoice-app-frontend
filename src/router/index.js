import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Invoice App | Frontend mentor challenge",
      },
    },
    {
      path: "/invoice/:id",
      name: "invoice",
      component: () => import("../views/InvoiceView.vue"),
      meta: {
        title: "Invoice Details",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
