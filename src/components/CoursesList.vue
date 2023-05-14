<template>
  <Modal
    :dialog="course_modal.open"
    @closeModal="course_modal.open = false"
    :data="course_modal.data"
  >
    <div v-if="course_modal.data.courses.length">
      <div v-for="course in course_modal.data.courses" :key="course.id">
        <v-card
          :title="course.name"
          :subtitle="'شماره دوره: ' + course.number"
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
              <span>{{ course.total_hours_attended || 0}}</span>
            </div>
          </v-card-text>
          <v-card-actions
            class="d-flex align-center justify-end"
            style="gap: 1rem"
          >
            <v-btn
              prepend-icon="mdi-account"
              color="green"
              @click="
                openAttendantsListModal(course)
              "
            >
              {{ course.members_quantity || 0 }}
              <v-tooltip activator="parent" location="bottom"
                >لیست شرکت کنندگان</v-tooltip
              >
            </v-btn>
            <v-btn
              icon="mdi-pencil"
              color="orange"
              :to="{ name: 'EditCourse', params: { id: course.id } }"
            >
            </v-btn>
            <v-btn
              icon="mdi-delete"
              color="red"
              @click="delete_course(course.id)"
            >
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
    <div v-else>
      <p>دوره ای برای نمایش وجود ندارد.</p>
    </div>
    <v-divider class="my-3"></v-divider>
    <v-btn
      style="position: absolute; bottom: 1rem; left: 1rem"
      icon="mdi-plus"
      color="primary"
      :to="{
        name: 'AddCourse',
        params: { province_id: course_modal.data.province_id },
      }"
    ></v-btn>
  </Modal>
  <AttendantsList :attendant_modal="attendant_modal" />
</template>

<script setup>
import Modal from "@/components/Modal.vue";
import { use_course_store } from "@/store/course";
import AttendantsList from "./AttendantsList.vue";
import { ref } from "vue";

const props = defineProps(["course_modal"]);
const attendant_modal = ref({
  open: false,
  data: {
    title: "لیست شرکت کنندگان",
    subtitle: null,
    icon: "mdi-account",
    course: {},
  },
});

const delete_course = async (id) => {
  await use_course_store().delete_course(id);
};
const openAttendantsListModal = async (data) => {
  attendant_modal.value.data.course = data;
  attendant_modal.value.data.subtitle = data.course_number;
  attendant_modal.value.open = true;
};
</script>
