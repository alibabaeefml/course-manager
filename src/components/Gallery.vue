<template>
  <div>
    <v-container>
      <v-card
        class="pa-3"
        prepend-icon="mdi-view-gallery-outline"
        title="گالری دوره"
      >
        <v-row>
          <v-col cols="4" style="aspect-ratio: 1/1">
            <input
              type="file"
              id="fileinput"
              @change="submit_media"
              class="d-none"
              accept=".jpg,.mp4"
              multiple
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
            v-if="media.length"
            cols="4"
            style="aspect-ratio: 1/1"
            v-for="media_item in media"
            :key="media_item.id"
            class="position-relative image-col h-100"
          >
            <v-btn
              class="position-absolute d-none"
              color="red"
              style="z-index: 10; left: 2rem; top: 2rem"
              icon="mdi-delete"
              @click="store().delete_media(media_item.id)"
            ></v-btn>
            <v-img
              v-if="media_item.src.split('.')[1] == 'jpg'"
              class="border rounded-lg"
              :src="media_item.src"
              cover
              width="100%"
              height="100%"
            ></v-img>
            <video
              v-if="media_item.src.split('.')[1] == 'mp4'"
              :src="media_item.src"
              class="w-100 h-100"
              style="object-fit: cover"
              controls
            ></video>
          </v-col>
        </v-row>
      </v-card>
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

  let to_upload_files = $("#fileinput").get(0).files;
  for (let item in to_upload_files) {
    form.append("file_" + item, to_upload_files[item]);
  }

  form.append("course_id", course_id);
  await store().create_media(form);
  $("#fileinput").val("");
};
</script>

<style scoped>
.image-col:hover button {
  display: block !important;
}
</style>
