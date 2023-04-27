<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="4" style="aspect-ratio: 1/1">
          <input
            type="file"
            id="fileinput"
            @change="submit_media"
            class="d-none"
          />
          <v-btn
            class="w-100 h-100"
            variant="outlined"
            color="primary"
            onclick="$('#fileinput').trigger('click')"
          >
            <v-icon size="50">mdi-plus</v-icon>
          </v-btn>
        </v-col>
        <v-col
          cols="4"
          style="aspect-ratio: 1/1"
          v-for="media_item in media"
          :key="media_item.id"
        >
          <v-img class="border rounded-lg" cover :src="media_item.src"></v-img>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { use_media_store as store } from "@/store/media";
import { useRoute } from "vue-router";
const props = defineProps(["media"]);

const course_id = useRoute().params.id;
const submit_media = async () => {
  const form = new FormData();
  form.append("file", $("#fileinput").get(0).files[0]);
  form.append("course_id", course_id);
  await store().create_media(form);
  $("#fileinput").val("")
};
</script>
