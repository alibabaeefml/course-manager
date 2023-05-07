<template>
  <v-card
    :prepend-icon="router.currentRoute.value.meta.icon"
    :title="router.currentRoute.value.meta.name_fa"
  >
    {{ get_teachers }} </v-card
  >
</template>
<script setup>
import { use_teacher_store } from "@/store/teacher";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

use_teacher_store().index_teachers();
const { get_teachers } = storeToRefs(use_teacher_store());
</script>
