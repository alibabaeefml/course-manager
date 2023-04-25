<template>
  <v-container class="fill-height">
    <v-form class="w-100">
      <v-card :title="name_fa" :prepend-icon="icon" class="w-100">
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
            :items="use_province_store().provinces"
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
            v-model="form.total_hours_participated_in"
            @input="submit_change"
          >
          </v-text-field>

          <v-carousel
            cycle
            height="400"
            hide-delimiter-background
            show-arrows="hover"
          >
            <v-carousel-item
              v-for="(media, i) in use_media_store().media"
              :key="media.id"
            >
              <v-sheet height="100%">
                <div class="d-flex fill-height justify-center align-center">
                  <v-img :src="media.src"></v-img>
                </div>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>

<script setup>
import { useRoute } from "vue-router";
import { use_course_store as store } from "@/store/course";
import { ref } from "vue";
import { onMounted } from "vue";
import { use_province_store } from "@/store/province";
import { use_media_store } from "@/store/media";
import { watchEffect } from "vue";

const { icon, name_fa } = useRoute().meta;

const form = ref({});
const course_id = useRoute().params.id;

onMounted(
  async () => (
    useRoute().name == "EditCourse"
      ? (form.value = await store().show_course(course_id))
      : null,
    await use_province_store().index_provinces(),
    await use_media_store().index_media(course_id)
  )
);

const submit_change = () => {
  store().update_course(course_id, form.value);
};
</script>
