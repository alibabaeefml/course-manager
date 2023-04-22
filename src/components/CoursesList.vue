<template>
  <Modal
    :dialog="course_modal.open"
    @closeModal="course_modal.open = false"
    :data="course_modal.data"
  >
      
  </Modal>
</template>

<script setup>
import Modal from "@/components/Modal.vue";
const props = defineProps(["course_modal"]);
</script>
