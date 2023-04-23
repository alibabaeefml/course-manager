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
          >
          </v-select>
          <v-text-field
            label="تاریخ شروع دوره"
            color="orange"
            variant="underlined"
            v-model="form.start_date"
          >
          </v-text-field>
          <v-text-field
            label="تاریخ پایان دوره"
            color="orange"
            variant="underlined"
            v-model="form.finish_date"
          >
          </v-text-field>
          <v-text-field
            label="مجموع ساعات شرکت شده در این دوره"
            color="orange"
            variant="underlined"
            v-model="form.total_hours_participated_in"
          >
          </v-text-field>

          <v-carousel
            cycle
            height="400"
            hide-delimiter-background
            show-arrows="hover"
          >
            <v-carousel-item v-for="(slide, i) in slides" :key="i">
              <v-sheet :color="colors[i]" height="100%">
                <div class="d-flex fill-height justify-center align-center">
                  <div class="text-h2">{{ slide }} Slide</div>
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

const { icon, name_fa } = useRoute().meta;

const form = ref({});

onMounted(
  async () => (
    useRoute().name == "EditCourse"
      ? (form.value = await store().show_course(useRoute().params.id))
      : null,
    await use_province_store().index_provinces()
  )
);

const slides = ref(["First", "Second", "Third", "Fourth", "Fifth"]);
const colors = ref([
  "indigo",
  "warning",
  "pink darken-2",
  "red lighten-1",
  "deep-purple accent-4",
]);
</script>
