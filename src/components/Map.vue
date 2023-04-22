<template>
  <div id="iran_map" style="width: 500px; height: 500px; margin: auto"></div>
 <CoursesList :course_modal="course_modal"/>
</template>

<script setup>
import { ref } from "vue";
import CoursesList from "./CoursesList.vue";
const course_modal = ref({
  open: false,
  data: {
    title: "لیست دوره ها",
    subtitle: null,
    icon: "mdi-google-classroom",
  },
});
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
        fill: "green",
        "fill-opacity": 1,
        stroke: "#fff",
        "stroke-width": 1,
        "stroke-opacity": 1,
      },
    },
  });

  $("[data-code]").click((e) => {
    course_modal.value.open = true;

  });
});
</script>
