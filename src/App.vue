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
            <v-list-item
              prepend-icon="mdi-home-city"
              title="Home"
              value="home"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-account"
              title="My Account"
              value="account"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-account-group-outline"
              title="Users"
              value="users"
            ></v-list-item>
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

const drawer = true;
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
