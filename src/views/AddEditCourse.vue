<template>
  <v-container class="fill-height">
    <v-form class="w-100">
      <v-card
        :title="useRoute().meta.name_fa"
        :prepend-icon="useRoute().meta.icon"
        class="w-100"
      >
        <v-card-text>
          <v-text-field
            label="نام دوره"
            color="orange"
            variant="underlined"
            v-model="form.name"
            @input="submit_change"
          >
          </v-text-field>
          <v-select
            label="استان"
            :items="get_provinces"
            item-title="name_fa"
            item-value="id"
            v-model="form.province_id"
            color="orange"
            variant="underlined"
            @update:modelValue="submit_change"
            :disabled="useRoute().params.id ? true : false"
          >
          </v-select>
          <v-text-field
            label="تاریخ شروع دوره"
            color="orange"
            variant="underlined"
            v-model="form.start_date"
            @input="submit_change"
          >
          </v-text-field>
          <v-text-field
            label="تاریخ پایان دوره"
            color="orange"
            variant="underlined"
            v-model="form.finish_date"
            @input="submit_change"
          >
          </v-text-field>
          <v-text-field
            label="مجموع ساعات شرکت شده در این دوره"
            color="orange"
            variant="underlined"
            v-model="form.total_hours_participated_in"
            @input="submit_change"
          >
          </v-text-field>

          <Gallery :media="get_media" />
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>

<script setup>
import { useRoute } from "vue-router";
import { use_course_store as store } from "@/store/course";
import { ref } from "vue";
import { use_province_store } from "@/store/province";
import { use_media_store } from "@/store/media";
import Gallery from "@/components/Gallery.vue";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { onUpdated } from "vue";

const form = ref({});

const { get_media } = storeToRefs(use_media_store());
const { get_provinces } = storeToRefs(use_province_store());

const show_course = async () => {
  let { id } = useRoute().params;
  if (id) {
    form.value = await store().show_course(id);
    await use_media_store().index_media(id);
  }
  await use_province_store().index_provinces();
};
show_course();

onUpdated(() => (useRoute().name == "AddCourse" ? (form.value = {}) : null));

let timeout = ref(null);
const submit_change = () => {
  clearTimeout(timeout.value);
  timeout.value = setTimeout(async () => {
    await store().update_course(form.value.id, form.value);
  }, 200);
};
</script>
