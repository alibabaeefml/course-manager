<template>
  <Modal
    :dialog="attendant_modal.open"
    @closeModal="attendant_modal.open = false"
    :data="attendant_modal.data"
    
  >
    <div v-if="get_attendants" >
      <div v-for="attendant in get_attendants" :key="attendant.id">
        <v-card
          :title="attendant.first_name + ' ' + attendant.last_name"
          :subtitle="'درجه/رتبه: ' + attendant.police_rank"
          class="mt-2"
          :height="!hover ? 180 : '100%'"
          onmouseenter="this.style.height='100%'"
          onmouseleave="this.style.height='180px'"
        >
          <v-card-text
            class="d-flex flex-column align-center"
            style="gap: 1rem"
          >
            <div
              class="d-flex align-cennter justify-space-between w-100"
              style="gap: 1rem"
            >
              <span>شماره پرسنلی:</span>
              <span>{{ attendant.attendance_time }}</span>
            </div>
            <div
              class="d-flex align-cennter justify-space-between w-100"
              style="gap: 1rem"
            >
              <span>کد ملی:</span>
              <span>{{ attendant.national_code }}</span>
            </div>
            <div
              class="d-flex align-cennter justify-space-between w-100"
              style="gap: 1rem"
            >
              <span>یگان:</span>
              <span>{{ attendant.department }}</span>
            </div>
            <div
              class="d-flex align-cennter justify-space-between w-100"
              style="gap: 1rem"
            >
              <span>استان محل سکونت:</span>
              <span>{{
                get_provinces.find((v) => v.id == attendant.province_id).name_fa
              }}</span>
            </div>

            <div
              class="d-flex align-cennter justify-space-between w-100"
              style="gap: 1rem"
            >
              <span>کلانتری:</span>
              <span>{{ attendant.is_primary ? "هدف" : "سایر" }}</span>
            </div>

            <div
              class="d-flex align-cennter justify-space-between w-100"
              style="gap: 1rem"
            >
              <span>تعداد عائله/همراه:</span>
              <span>{{ attendant.family_members }}</span>
            </div>

            <div
              class="d-flex align-cennter justify-space-between w-100"
              style="gap: 1rem"
            >
              <span>فرزندان زیر 2 سال:</span>
              <span>{{ attendant.under_two_year_old_children_quantity }}</span>
            </div>
            <div
              class="d-flex align-cennter justify-space-between w-100"
              style="gap: 1rem"
            >
              <span>فرزندان بالای 2 سال:</span>
              <span>{{ attendant.over_two_year_old_children_quantity }}</span>
            </div>
            <div
              class="d-flex align-cennter justify-space-between w-100"
              style="gap: 1rem"
            >
              <span>شماره همراه:</span>
              <span>{{ attendant.phone_number }}</span>
            </div>

            <div class="w-100">
              <b>همراهان:</b>
              <div v-if="attendant.relatives.length" class="mt-3">
                <div
                  class="d-flex align-cennter justify-space-between w-100"
                  style="gap: 1rem"
                  v-for="r in attendant.relatives"
                  :key="r"
                >
                  <span>نام: {{ r.name }}</span>
                  <span>نسبت: {{ r.relation }}</span>
                  <span>مدت ساعت شرکت: {{ r.attendance_time }}</span>
                </div>
              </div>
              <div v-else>بدون همراه</div>
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
        params: { course_id: attendant_modal.data.course.id },
      }"
    ></v-btn>
  </Modal>
</template>

<script setup>
import Modal from "@/components/Modal.vue";
import { use_attendant_store as attendant_store } from "@/store/attendant";
import { use_province_store } from "@/store/province";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { watch } from "vue";
const { get_attendants } = storeToRefs(attendant_store());
const props = defineProps(["attendant_modal"]);
const index_attendant = async () => {
  if (props.attendant_modal.open) {
    await attendant_store().index_attendants(
      props.attendant_modal.data.course.id
    );
  }
};
watch(props.attendant_modal, () => {
  if (props.attendant_modal.open == true) index_attendant();
});

const { get_provinces } = storeToRefs(use_province_store());
// index_attendant();
const delete_attendant = async (id) => {
  await attendant_store().delete_attendant(id);
};
const hover = ref(false)
</script>
