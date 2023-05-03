import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { url } from "@/service/api";
// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const use_teacher_store = defineStore("teacher", () => {
  const teachers = ref([]);
  const get_teachers = computed(() => teachers.value);
  const index_teachers = async () => {
    const res = await axios.get(url(`/index-teacher`));
    teachers.value = res.data;
  };

  const create_teacher = async (teacher_data) => {
    const res = await axios.post(url("/create-teacher"), teacher_data);
    return res.data;
  };

  const show_teacher = async (teacher_id) => {
    const res = await axios.get(url(`/show-teacher/${teacher_id}`));
    return res.data;
  };

  const delete_teacher = async (teacher_id) => {
    const res = await axios.delete(url(`/delete-teacher/${teacher_id}`));
    teachers.value = res.data;
  };

  const update_teacher = async (teacher_id, teacher_data) => {
    const res = await axios.put(
      url(`/update-teacher/${teacher_id}`),
      teacher_data
    );
    teachers.value = res.data;
    return res.status == 200;
  };

  return {
    teachers,
    get_teachers,
    index_teachers,
    create_teacher,
    show_teacher,
    delete_teacher,
    update_teacher,
  };
});
