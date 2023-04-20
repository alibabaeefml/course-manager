<template>
   <v-locale-provider rtl>
    <router-view />
   </v-locale-provider>
</template>

<script setup>
// test api
import axios from "axios";
</script>

<style>
@font-face {
   font-family: iranyekan;
   src: url(@/assets/IRANYekanMedium.ttf);
}
:root {
   font-family: iranyekan;
}
</style>