import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { url } from "@/service/api";
// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const use_media_store = defineStore("media", () => {
  const media = ref([]);

  const index_courses = async (province_id) => {
    const res = await axios.get(url(`/index-media/${province_id}`));
    courses.value = res.data;
  };

  const create_course = async (course_data) => {
    const res = await axios.get(url("/create-course/"), course_data);
    courses.value.push(res.data);
  };

  const show_course = async (course_id) => {
    const res = await axios.get(url(`/show-course/${course_id}`));
    return res.data;
  };

  const delete_course = async (course_id) => {
    const res = await axios.delete(url(`/delete-course/${course_id}`));
    courses.value = res.data;
  };

  const update_course = async (course_id, course_data) => {
    const res = await axios.put(
      url(`/update-course/${course_id}`),
      course_data
    );
    courses.value = res.data;
  };

  return {
    courses,
    index_courses,
    create_course,
    show_course,
    delete_course,
    update_course,
  };
});
