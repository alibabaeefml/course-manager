// Composables
import { use_media_store } from "@/store/media";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
      },
      {
        path: "/add-course/:province_id?",
        name: "AddCourse",
        meta: {
          name_fa: "افزودن دوره",
          icon: "mdi-plus",
        },
        component: () => import("@/views/AddEditCourse.vue"),
      },
      {
        path: "/edit-course/:id",
        name: "EditCourse",
        meta: {
          name_fa: "ویرایش دوره",
          icon: "mdi-pencil",
        },
        component: () => import("@/views/AddEditCourse.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((from) => {
  if (from.name == "EditCourse") {
    use_media_store().reset();
  }
});
export default router;
