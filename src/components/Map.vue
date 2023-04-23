<template>
  <div id="iran_map" style="width: 500px; height: 500px; margin: auto"></div>
  <CoursesList :course_modal="course_modal"/>
</template>

<script setup>
import { ref } from "vue";
import CoursesList from "./CoursesList.vue";
import { use_province_store as store } from "@/store/province";
import { use_course_store } from "@/store/course";

const course_modal = ref({
  open: false,
  data: {
    title: "لیست دوره ها",
    subtitle: null,
    icon: "mdi-google-classroom",
    province_id: null,
    courses: [],
  },
});

store().index_provinces();

$(() => {
  $("#iran_map").vectorMap({
    map: "ir_mill",
    enableZoom: SVGComponentTransferFunctionElement,
    backgroundColor: "transparent",
    zoomOnScroll: false,
    normalizeFunction: "polynomial",
    hoverOpacity: 1,
    regionStyle: {
      initial: {
        fill: "#02d6d7",
        "fill-opacity": 1,
        stroke: "#fff",
        "stroke-width": 1,
        "stroke-opacity": 1,
      },
    },
  });

  $("[data-code]").click((e) => {
    course_modal.value.open = true;
    store().provinces.map(async (p) => {
      if (p.name_en == e.target.getAttribute("data-code")) {
        course_modal.value.data.subtitle = p.name_fa;
        course_modal.value.data.province_id = p.id;
        await use_course_store().index_courses(p.id);
        course_modal.value.data.courses = use_course_store().courses;
      }
    });
  });
});
</script>
