<template>
  <v-container class="fill-height">
    <v-responsive class="text-center">
      <div class="d-flex flex-column" style="gap:1rem">
        <v-img contain height="200" src="@/assets/logo.png"  />
      <h1>مدیریت دوره های خانوادگی تربیت اسلامی ناجا</h1>
      <h2>ورود به برنامه</h2>

      <v-text-field v-model="password" label="رمز عبور" variant="underlined" clearable required></v-text-field>
      </div>
      
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const password = ref();
</script>
