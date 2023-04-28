import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { url } from "@/service/api";
// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const use_province_store = defineStore("province", () => {
  const provinces = ref([]);
  const get_provinces = computed(() => provinces.value);

  const index_provinces = async () => {
    const res = await axios.get(url("/index-provinces"));
    provinces.value = res.data;
  };
  return { provinces, index_provinces, get_provinces };
});
