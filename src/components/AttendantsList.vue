<template>
  <Modal
    :dialog="attendant_modal.open"
    @closeModal="attendant_modal.open = false"
    :data="attendant_modal.data"
  >
    <div v-if="get_attendants">
      <div v-for="attendant in get_attendants" :key="attendant.id">
        <v-card
          :title="attendant.name"
          :subtitle="'شماره دوره: ' + attendant.course_number"
          class="mt-2"
        >
          <v-card-text
            class="d-flex flex-column align-center"
            style="gap: 1rem"
          >
            <div
              class="d-flex align-cennter justify-space-between w-100"
              style="gap: 1rem"
            >
              <span>تاریخ شروع</span>
              <span>{{ course.start_date }}</span>
            </div>
            <div
              class="d-flex align-cennter justify-space-between w-100"
              style="gap: 1rem"
            >
              <span>تاریخ پایان</span>
              <span>{{ course.finish_date }}</span>
            </div>
            <div
              class="d-flex align-cennter justify-space-between w-100"
              style="gap: 1rem"
            >
              <span>مجموع ساعات شرکت شده در این دوره</span>
              <span>{{ course.total_hours_attended }}</span>
            </div>
          </v-card-text>
          <v-card-actions
            class="d-flex align-center justify-end"
            style="gap: 1rem"
          >
            <v-btn
              icon="mdi-pencil"
              color="orange"
              :to="{ name: 'EditAttendant', params: { id: attendant.id } }"
            >
            </v-btn>
            <v-btn
              icon="mdi-delete"
              color="red"
              @click="delete_attendant(attendant.id)"
            >
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
    <div v-else>
      <p>شرکت کننده ای برای نمایش وجود ندارد.</p>
    </div>
    <v-divider class="my-3"></v-divider>
    <v-btn
      style="position: absolute; bottom: 1rem; left: 1rem"
      icon="mdi-plus"
      color="primary"
      :to="{
        name: 'AddAttendant',
        params: { course_id: 'ddsvds' },
      }"
    ></v-btn>
  </Modal>
</template>

<script setup>
import Modal from "@/components/Modal.vue";
import { use_attendant_store as attendant_store } from "@/store/attendant";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const { get_attendants } = storeToRefs(attendant_store);
const props = defineProps(["attendant_modal"]);
const index_attendant = async () => {
  await attendant_store().index_attendants();
};
index_attendant();
const delete_attendant = async (id) => {};
</script>
