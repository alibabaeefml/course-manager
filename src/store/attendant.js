import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { url } from "@/service/api";
// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const use_attendant_store = defineStore("attendant", () => {
  const attendants = ref([]);
  const get_attendants = computed(() => attendants.value);
  const index_attendants = async (course_id) => {
    const res = await axios.get(url(`/index-attendant/${course_id}`));
    attendants.value = res.data;
  };

  const create_attendant = async (attendant_data) => {
    const res = await axios.post(url("/create-attendant"), attendant_data);
    return res.data;
  };

  const show_attendant = async (attendant_id) => {
    const res = await axios.get(url(`/show-attendant/${attendant_id}`));
    return res.data;
  };

  const delete_attendant = async (attendant_id) => {
    const res = await axios.delete(url(`/delete-attendant/${attendant_id}`));
    attendants.value = res.data;
  };

  const update_attendant = async (attendant_id, attendant_data) => {
    const res = await axios.put(
      url(`/update-attendant/${attendant_id}`),
      attendant_data
    );
    attendants.value = res.data;
    return res.status == 200;
  };

  return {
    attendants,
    get_attendants,
    index_attendants,
    create_attendant,
    show_attendant,
    delete_attendant,
    update_attendant,
  };
});
