<template>
  <div id="iran_map"></div>
</template>

<script setup>
$(() => {
  $("#iran_map").vectorMap({
    map: "ir_mill",
    enableZoom: SVGComponentTransferFunctionElement,
    backgroundColor: "transparent",
    zoomOnScroll: false,
    normalizeFunction: "polynomial",
    hoverOpacity: 0.7,
    hoverColor: false,
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
});
</script>
