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
          <v-alert
            v-if="!form.name"
            type="error"
            title="خطا!"
            text="نام دوره الزامی است"
          ></v-alert>
          <v-text-field
            label="شماره دوره"
            color="orange"
            variant="underlined"
            v-model="form.number"
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
            v-model="form.total_hours_attended"
            @input="submit_change"
          >
          </v-text-field>

          <Gallery
            :media="get_media"
            v-if="router.currentRoute.value.name == 'EditCourse'"
          />
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { use_course_store as store } from "@/store/course";
import { ref } from "vue";
import { use_province_store } from "@/store/province";
import { use_media_store } from "@/store/media";
import Gallery from "@/components/Gallery.vue";
import { storeToRefs } from "pinia";
const router = useRouter();

const form = ref({});

const { get_media } = storeToRefs(use_media_store());
const { get_provinces } = storeToRefs(use_province_store());

const fetch_data = async (current_route) => {
  const course_id = current_route.params.id;
  const { province_id } = current_route.params;
  if (course_id) {
    form.value = await store().show_course(course_id);
    await use_media_store().index_media(course_id);
  }
  await use_province_store().index_provinces();
  if (province_id) form.value.province_id = Number(province_id);
};
fetch_data(router.currentRoute.value);

router.beforeEach((from, to) => {
  if (from.name == "AddCourse") {
    form.value = {};
    use_media_store().reset();
  } else {
    fetch_data(from);
  }
});

let timeout = ref(null);

const submit_change = () => {
  clearTimeout(timeout.value);
  timeout.value = setTimeout(async () => {
    if (router.currentRoute.value.name == "EditCourse") {
      await store().update_course(form.value.id, form.value);
    } else {
      if (form.value.name && form.value.province_id) {
        const course = await store().create_course(form.value);
        router.push({ name: "EditCourse", params: { id: course.id } });
      }
    }
  }, 200);
};
</script>
