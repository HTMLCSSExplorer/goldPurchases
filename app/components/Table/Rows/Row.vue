<template>
  <div
    class="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 p-4 rounded-lg mt-2 duration-200"
    :class="[
      isLoading ? 'opacity-0' : 'opacity-100',
      lostProfit > 0
        ? 'odd:bg-green-700 even:bg-green-800'
        : 'odd:bg-red-700 even:bg-red-800',
    ]"
  >
    <p class="text-center capitalize font-medium">
      {{ purchaseDate || 'Loading' }}
    </p>
    <p class="text-center capitalize font-medium">
      {{ row.coin || 'Loading' }}
    </p>
    <p class="text-center capitalize font-medium">
      {{ row.unit || 'Loading' }}
    </p>
    <p class="text-center capitalize font-medium">
      {{ row.buyPrice || 'Loading' }}
    </p>
    <p class="text-center capitalize font-medium">{{ buyCost || 'Loading' }}</p>
    <p class="text-center capitalize font-medium">
      {{ livePrice || 'Loading' }}
    </p>
    <p class="text-center capitalize font-medium">
      {{ lostProfit || 'Loading' }}
    </p>
    <UButton
    label="delete" color="warning"  class="flex items-center justify-center uppercase font-bold cursor-pointer "
    @click="deleteRow"
    />
  </div>
</template>

<script lang="ts" setup>
const serverData = useLocalStorage('server-data', []);
const { isLoading } = useLoadStatus();
const props = defineProps({
  row: {
    type: Object,
    default: () => ({}),
  },
});
const purchaseDate = computed(() => {
  const date = new Date(props.row.createdAt).toLocaleDateString();
  return date;
});
const buyCost = computed(() => {
  const unit = props.row.unit;
  const buyPrice = props.row.buyPrice;
  return unit * buyPrice;
});
const livePrice = computed(() => {
  const foundData = serverData.value.find(
    (purchase) => purchase.key === props.row.coin
  );

  return String(stringToNumber(foundData.buy));
});
const emit = defineEmits(['emit-lost-profit-amount','handle-delete']);
const lostProfit = computed(() => {
  const unit = +props.row.unit;
  const cost = +buyCost.value;
  const currentPrice = Number(livePrice.value) * unit;
  const lp = currentPrice - cost || 0;

  return lp;
});

onMounted(async () => {
  
  emit('emit-lost-profit-amount', lostProfit.value);
});

const deleteRow = ()=>{
  emit('handle-delete',props.row.id )
}
</script>

<style scoped></style>
