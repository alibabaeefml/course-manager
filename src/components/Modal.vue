<template>
  <div class="text-center">
    <v-dialog :width="data.width || 750" v-model="dialog" scrollable >
      <v-card
        :title="data.title || 'عنوان مدال'"
        :subtitle="data.subtitle || 'زیر عنوان مدال'"
        :prepend-icon="data.icon || 'mdi-window-maximize'"
      >
        <v-card-text>
          <slot><template></template></slot>
        </v-card-text>
        <v-card-actions class="d-flex align-items-center">
          <v-btn
            color="primary"
            @click="$emit('closeModal')"
            icon="mdi-close"
            style="position: absolute; top: 1rem; left: 1rem"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps(["dialog", "data"]);
const dialog = computed(() => props.dialog);
</script>
