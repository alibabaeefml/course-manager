<template>
  <v-card
    :prepend-icon="router.currentRoute.value.meta.icon"
    :title="router.currentRoute.value.meta.name_fa"
  >
    <v-card-text>
      <v-text-field
        label="نام و نام خانوادگی"
        variant="underlined"
        v-model="form.name"
        @input="submit_change"
        :rules="[(v) => isNaN(v) || 'نام استاد نباید شماره باشد!']"
      ></v-text-field>
      <v-text-field
        label="کد ملی"
        variant="underlined"
        v-model="form.national_code"
        @input="submit_change"
        :rules="[(v) => !isNaN(v) || 'فقط شماره مجاز است']"
      ></v-text-field>
      <v-select
        label="تحصیلات"
        :items="['مربی', 'لیسانس', 'فوق لیسانس', 'دکتری']"
        variant="underlined"
        v-model="form.education"
        @update:modelValue="submit_change"
      ></v-select>
      <v-select
        label="عنوان / رتبه"
        :items="['استاد', 'حجت الاسلام و المسلمین', 'آیت الله']"
        variant="underlined"
        v-model="form.title"
        @update:modelValue="submit_change"
      ></v-select>
      <v-text-field label="سمت" variant="underlined" v-model="form.position">
        
      </v-text-field>
      <v-autocomplete
        label="دوره های تدریس شده"
        :items="get_courses"
        item-value="id"
        item-title="number"
        multiple
        variant="underlined"
        v-model="form.courses_taught"
        @update:modelValue="submit_change"
      >
        <template #selection="{ item }">
          <div class="d-flex align-items-center" style="gap: 5px">
            <span>{{ item.raw.name }}</span>
            <span style="font-size: small">({{ item.raw.number }})</span>
          </div>
        </template>
      </v-autocomplete>

      <v-text-field
        label="مجموع ساعات تدریس شده "
        variant="underlined"
        v-model="form.total_hours_taught"
        type="number"
        @input="submit_change"
      ></v-text-field>
      <v-text-field
        label="شماره کارت / شبا"
        variant="underlined"
        v-model="form.bank_account"
        maxlength="24"
        :rules="[(v) => !isNaN(v) || 'فقط شماره مجاز است']"
        @input="submit_change"
      ></v-text-field>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { use_course_store } from "@/store/course";
import { use_teacher_store } from "@/store/teacher";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({});

use_course_store().index_courses();
const { get_courses } = storeToRefs(use_course_store());

const show_teacher = async () => {
  if (router.currentRoute.value.name == "EditTeacher") {
    let teacher = await use_teacher_store().show_teacher(
      router.currentRoute.value.params.id
    );
    form.value = teacher;
  }
};
show_teacher();
let timeout = ref(null);

const submit_change = () => {
  clearTimeout(timeout.value);
  timeout.value = setTimeout(async () => {
    if (form.value.name && form.value.national_code) {
      if (router.currentRoute.value.name == "AddTeacher") {
        const teacher = await use_teacher_store().create_teacher(form.value);
        teacher
          ? router.push({ name: "EditTeacher", params: { id: teacher.id } })
          : null;
      } else {
        await use_teacher_store().update_teacher(form.value.id ,form.value);
      }
    }
  }, 200);
};
</script>
