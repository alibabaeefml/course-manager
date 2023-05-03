<template>
  <v-locale-provider rtl>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = false"
          color="primary"
        >
          <v-list-item
            prepend-avatar="@/assets/logo.png"
            title="مدیریت دوره"
            nav
          >
            <template v-slot:append>
              <v-btn
                variant="text"
                icon="mdi-chevron-right"
                @click.stop="rail = !rail"
              ></v-btn>
            </template>
          </v-list-item>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <router-link to="/" class="text-decoration-none text-black">
              <v-list-item
                prepend-icon="mdi-earth-box"
                value=""
                title="نقشه"
                :active="useRoute().name == 'Home'"
              ></v-list-item>
            </router-link>

            <router-link
              :to="{ name: 'AddCourse' }"
              class="text-decoration-none text-black"
            >
              <v-list-item
                value=""
                prepend-icon="mdi-google-classroom"
                title="افزودن دوره"
                :active="useRoute().name == 'AddCourse'"
              ></v-list-item>
            </router-link>

            <router-link
              to="/add-attendant"
              class="text-decoration-none text-black"
            >
              <v-list-item
                prepend-icon="mdi-account"
                value=""
                title="افزودن شرکت کننده"
                :active="useRoute().name == 'AddAttendant'"
              ></v-list-item>
            </router-link>
            <router-link to="/teachers" class="text-decoration-none text-black">
              <v-list-item
                prepend-icon="mdi-account-badge"
                title="لیست اساتید"
                value=""
                :active="useRoute().name == 'AddTeacher'"
              ></v-list-item>
            </router-link>
            <router-link
              to="/add-teacher"
              class="text-decoration-none text-black"
            >
              <v-list-item
                prepend-icon="mdi-account-badge"
                title="افزودن استاد"
                value=""
                :active="useRoute().name == 'AddTeacher'"
              ></v-list-item>
            </router-link>

            <div v-if="!rail">
              <v-img class="rounded-lg" src="./assets/logo.png"></v-img>
            </div>
          </v-list>
        </v-navigation-drawer>
        <v-main>
          <router-view />
        </v-main>
      </v-layout>
    </v-card>
  </v-locale-provider>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const drawer = ref(true);
const rail = ref(false);
</script>

<style>
@font-face {
  font-family: iranyekan;
  src: url(@/assets/IRANYekanMedium.ttf);
}
:root {
  font-family: iranyekan;
}
[data-code] {
  transition: 0.3s;
}
[data-code]:hover {
  filter: drop-shadow(0px 0px 10px black);
  opacity: 1;
}
[data-code]:active {
  fill: #02d6d7;
  filter: unset;
}
</style>
