<template>
  <v-container class="d-flex justify-center h-100">
    <v-card
      :prepend-icon="router.currentRoute.value.meta.icon"
      :title="router.currentRoute.value.meta.name_fa"
      class="ma-2 pa-3 w-100"
    >
      <v-card class="pa-3" v-for="teacher in get_teachers" :key="teacher.id">
        <v-card-text>
          <div class="d-flex justify-space-between align-center">
            <h3>نام:</h3>
            <h3>{{ teacher.name }}</h3>
          </div>
          <hr class="my-5" />
          <div class="d-flex justify-space-between align-center">
            <h3>کد ملی:</h3>
            <h3>{{ teacher.national_code }}</h3>
          </div>
          <hr class="my-5" />
          <div class="d-flex justify-space-between align-center">
            <h3>تحصیلات:</h3>
            <h3>{{ teacher.education }}</h3>
          </div>
          <hr class="my-5" />
          <div class="d-flex justify-space-between align-center">
            <h3>شماره شبا / شماره کارت:</h3>
            <h3>{{ teacher.bank_account }}</h3>
          </div>
          <hr class="my-5" />
          <div class="d-flex justify-space-between align-center">
            <h3>شماره دوره های تدریس شده:</h3>
            <h3>{{ teacher.courses_taught }}</h3>
          </div>
          <hr class="my-5" />
          <div class="d-flex justify-space-between align-center">
            <h3>مجموع ساعات تدریس:</h3>
            <h3>{{ teacher.total_hours_taught }}</h3>
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn
            icon="mdi-pencil"
            color="orange"
            :to="{ name: 'EditTeacher', params: { id: teacher.id } }"
          ></v-btn>
          <v-btn icon="mdi-delete" color="red" @click="use_teacher_store().delete_teacher(teacher.id)"></v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-container>
</template>
<script setup>
import { use_teacher_store } from "@/store/teacher";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

use_teacher_store().index_teachers();
const { get_teachers } = storeToRefs(use_teacher_store());
</script>
