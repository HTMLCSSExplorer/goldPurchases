<template>
  <div
    class="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 p-2 border-b-2 border-b-amber-100/10"
  >
    <p
      v-for="title in headTitles"
      :key="title"
      class="text-center capitalize font-bold text-lg"
    >
      {{ title }}
    </p>
  </div>
</template>

<script lang="ts" setup>
const headTitles = [
  'date',
  'coin name',
  'unit',
  'buy price',
  'buy cost',
  'live price',
  'lost profit',
  'actions',
];
</script>

<style scoped></style>
