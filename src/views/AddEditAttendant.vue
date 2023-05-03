<template>
  <v-container class="fill-height">
    <v-form class="w-100">
      <v-card
        :title="router.currentRoute.value.meta.name_fa"
        :prepend-icon="router.currentRoute.value.meta.icon"
        class="w-100"
      >
        <v-card-text>
          <v-text-field
            label="درجه انتظامی"
            color="green"
            variant="underlined"
            v-model="form.police_rank"
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
            label="کد ملی"
            color="green"
            variant="underlined"
            v-model="form.national_code"
            @input="submit_change"
          >
          </v-text-field>
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
          >
          </v-checkbox>
          <div class="d-flex align-center justify-space-between w-100">
            <h3>آشنایان</h3>
            <hr style="width: 85%" />
            <v-btn icon="mdi-plus" @click="add_relative"></v-btn>
          </div>
          <v-card
            class="mt-3 pa-3 "
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
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const form = ref({ relatives: [] });
const add_relative = async () => {
  form.value.relatives.push({
    name: "",
    relation: "",
    attendance_time: "",
  });
};
const delete_relative = (name) => {
  let to_delete = form.value.relatives.find((v) => v.name == name);
  form.value.relatives.splice(form.value.relatives.indexOf(to_delete), 1);
};

const submit_change = () => {};
</script>
