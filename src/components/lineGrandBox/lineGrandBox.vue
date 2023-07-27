<template>
  <div class="ColorBox"></div>
</template>
<script setup>
const colorList = defineProps({
  list: {
    type: Array,
    required: true,
  },
})
</script>
<style scoped></style>
