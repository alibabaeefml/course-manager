<template>
  <v-container class="fill-height">
    <v-responsive class="text-center">
      <div class="d-flex flex-column" style="gap: 1rem">
        <v-img contain height="200" src="@/assets/logo.png" />
        <h1>مرکز تربیت و تعالی حضرت ثامن الحجج (ع)</h1>
        <h1>نرم افزار مدیریت دوره</h1>
        <h2>ورود به برنامه</h2>
        <v-form>
          <v-text-field
          v-model="password"
          label="رمز عبور"
          variant="underlined"
          prepend-icon="mdi-lock"
          autofocus
          clearable
          required
          class="w-50 mx-auto"
        ></v-text-field>
        </v-form>
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const password = ref();
</script>
