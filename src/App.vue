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
                title="نقشه"
                value="home"
                :active="useRoute().name == 'Home'"
              ></v-list-item>
            </router-link>

            <router-link
              :to="{name:'AddCourse'}"
              class="text-decoration-none text-black"
            >
              <v-list-item
                prepend-icon="mdi-google-classroom"
                title="افزودن دوره"
                value="home"
                :active="useRoute().name == 'AddCourse'"
              ></v-list-item>
            </router-link>

            <router-link
              to="/add-participant"
              class="text-decoration-none text-black"
            >
              <v-list-item
                prepend-icon="mdi-account"
                title="افزودن شرکت کننده"
                value="home"
                :active="useRoute().name == 'AddParticipant'"
              ></v-list-item>
            </router-link> 
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
const rail = ref(true);
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
