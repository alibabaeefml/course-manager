<template>
  <v-container class="fill-height">
    <v-form class="w-100">
      <v-card
        :title="router.currentRoute.value.meta.name_fa"
        :prepend-icon="router.currentRoute.value.meta.icon"
        class="w-100"
      >
        <v-card-text>
          <v-select
            label="دوره"
            :items="get_courses"
            item-title="name"
            item-value="id"
            v-model="form.course_id"
            color="orange"
            variant="underlined"
            @update:modelValue="submit_change"
          >
          </v-select>
          <v-text-field
            label="درجه/رتبه"
            color="green"
            variant="underlined"
            v-model="form.police_rank"
            @input="submit_change"
          >
          </v-text-field>
          <v-text-field
            label="یگان"
            color="green"
            variant="underlined"
            v-model="form.department"
            @input="submit_change"
          >
          </v-text-field>
          <v-text-field
            label="نام"
            color="green"
            variant="underlined"
            v-model="form.first_name"
            @input="submit_change"
          >
          </v-text-field>
          <v-text-field
            label="نام خانوادگی"
            color="green"
            variant="underlined"
            v-model="form.last_name"
            @input="submit_change"
          >
          </v-text-field>
          <v-text-field
            label="شماره پرسنلی"
            color="green"
            variant="underlined"
            v-model="form.personal_number"
            @input="submit_change"
          >
          </v-text-field>
          <v-text-field
            label="تعداد عائله"
            color="green"
            variant="underlined"
            v-model="form.family_members"
            @input="submit_change()"
          >
          </v-text-field>
          <v-text-field
            label="کد ملی"
            color="green"
            variant="underlined"
            v-model="form.national_code"
            @input="submit_change"
          >
          </v-text-field>
          <v-alert
            v-if="repetitive"
            type="warning"
            title="اخطار!"
            text="کد ملی وارد شده تکراری است"
          ></v-alert>
          <v-text-field
            label="تعداد فرزندان زیر 2 سال"
            color="green"
            variant="underlined"
            v-model="form.under_two_year_old_children_quantity"
            @input="submit_change"
          >
          </v-text-field>
          <v-text-field
            label="تعداد فرزندان بالای 2 سال"
            color="green"
            variant="underlined"
            v-model="form.over_two_year_old_children_quantity"
            @input="submit_change"
          >
          </v-text-field>
          <v-select
            label="استان"
            :items="get_provinces"
            item-title="name_fa"
            item-value="id"
            v-model="form.province_id"
            color="orange"
            variant="underlined"
            @update:modelValue="submit_change"
          >
          </v-select>
          <v-text-field
            label="شهر"
            color="green"
            variant="underlined"
            v-model="form.city"
            @input="submit_change"
          >
          </v-text-field>
          <v-text-field
            label="شماره همراه"
            color="green"
            variant="underlined"
            v-model="form.phone_number"
            @input="submit_change"
          >
          </v-text-field>
          <v-text-field
            label="مدت ساعت شرکت در دوره"
            color="green"
            variant="underlined"
            v-model="form.attendance_time"
            @input="submit_change"
          >
          </v-text-field>
          <v-checkbox
            v-model="form.is_primary"
            label="کلانتری هدف"
            color="green"
            @click="submit_change"
          >
          </v-checkbox>
          <div class="d-flex align-center justify-space-between w-100">
            <h3>همراهان</h3>
            <hr style="width: 85%" />
            <v-btn icon="mdi-plus" @click="add_relative"></v-btn>
          </div>
          <v-card
            class="mt-3 pa-3"
            v-for="relative in form.relatives"
            :key="relative"
          >
            <v-text-field
              label="نام و نام خانوادگی"
              color="green"
              variant="underlined"
              v-model="relative.name"
              @input="submit_change"
            >
            </v-text-field>
            <v-text-field
              label="نسبت"
              color="green"
              variant="underlined"
              v-model="relative.relation"
              @input="submit_change"
            >
            </v-text-field>
            <v-text-field
              label="مدت ساعت شرکت در دوره"
              color="green"
              variant="underlined"
              v-model="relative.attendance_time"
              :rules="[(v) => !isNaN(v) || 'باید شماره باشد']"
              @input="submit_change"
            >
            </v-text-field>
            <v-card-actions class="d-flex justify-end">
              <v-btn
                @click="delete_relative(relative.name)"
                variant="elevated"
                icon="mdi-delete"
                color="red"
                left
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>
<script setup>
import { use_attendant_store } from "@/store/attendant";
import { use_course_store } from "@/store/course";
import { use_province_store } from "@/store/province";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const form = ref({ is_primary: false, relatives: [] });
const add_relative = async () => {
  form.value.relatives.push({
    name: "",
    relation: "",
    attendance_time: "",
  });
};
const show = async () => {
  let id = router.currentRoute.value.params.id;
  form.value = await use_attendant_store().show_attendant(id);
};
if (router.currentRoute.value.name == "EditAttendant") {
  show();
}
form.value.course_id = Number(router.currentRoute.value.params.course_id);
use_course_store().index_courses();
use_province_store().index_provinces();
const { get_provinces } = storeToRefs(use_province_store());

const { get_courses } = storeToRefs(use_course_store());
const delete_relative = (name) => {
  let to_delete = form.value.relatives.find((v) => v.name == name);
  form.value.relatives.splice(form.value.relatives.indexOf(to_delete), 1);
  submit_change();
};
let timeout = ref(null);
const repetitive = ref(false)
const submit_change = () => {
  clearTimeout(timeout.value);

  timeout.value = setTimeout(async () => {
    if (form.value.national_code) {
      let res = await use_attendant_store().show_attendant_by_NC(
        form.value.national_code
      );
      if (res) {
        repetitive.value = true;
      } else {
        repetitive.value = false;
      }
    }
    if (router.currentRoute.value.name == "AddAttendant") {
      let res = await use_attendant_store().create_attendant(form.value);
      form.value.id = res.id;
      if (res)
        router.push({ name: "EditAttendant", params: { id: form.value.id } });
    } else {
      await use_attendant_store().update_attendant(form.value.id, form.value);
    }
  }, 200);
};
</script>
