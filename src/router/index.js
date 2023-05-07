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
          name_fa: "ثبت دوره",
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
      {
        path: "/add-attendant/:course_id?",
        name: "AddAttendant",
        meta: {
          name_fa: "بانک اطلاعات شرکت کنندگان",
          icon: "mdi-account-plus",
        },
        component: () => import("@/views/AddEditAttendant.vue"),
      },
      {
        path: "/edit-attendant/:id",
        name: "EditAttendant",
        meta: {
          name_fa: "ویرایش شرکت کننده",
          icon: "mdi-account-edit",
        },
        component: () => import("@/views/AddEditAttendant.vue"),
      },
      {
        path: "/teachers",
        name: "Teachers",
        meta: {
          name_fa: "لیست استادها",
          icon: "mdi-account-badge",
        },
        component: () => import("@/views/Teachers.vue"),
      },
      {
        path: "/add-teacher",
        name: "AddTeacher",
        meta: {
          name_fa: "افزودن استاد",
          icon: "mdi-plus",
        },
        component: () => import("@/views/AddEditTeacher.vue"),
      },
      {
        path: "/edit-teacher/:id",
        name: "EditTeacher",
        meta: {
          name_fa: "ویرایش استاد",
          icon: "mdi-pencil",
        },
        component: () => import("@/views/AddEditTeacher.vue"),
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
