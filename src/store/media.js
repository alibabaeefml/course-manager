import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { url } from "@/service/api";
// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const use_media_store = defineStore("media", () => {
  const media = ref([]);
  const get_media = computed(() => media.value);
  const index_media = async (course_id) => {
    const res = await axios.get(url(`/index-media/${course_id}`));
    media.value = res.data;
  };

  const create_media = async (media_data) => {
    const res = await axios.post(url("/create-media"), media_data);
    console.log(res)
    media.value = res.data;
  };

  const delete_media = async (media_id) => {
    const res = await axios.delete(url(`/delete-media/${media_id}`));
    media.value = res.data;
  };

  return {
    media,
    get_media,
    index_media,
    create_media,
    delete_media,
  };
});
