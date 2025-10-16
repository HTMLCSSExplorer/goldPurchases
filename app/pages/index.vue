<template>
  <div>
    <UContainer>
      <TableHead />
      <TableRowsRow
        v-for="row in rows"
        :key="row.id"
        :row="row"
        @emit-lost-profit-amount="calulateTotalLostProfit"
      />
      <h2>{{ totalLostProfit.toFixed(2) }}</h2>
    </UContainer>
  </div>
</template>

<script setup>
const { retriveRows } = useRows();
const { userState } = useUserState();
const { rows } = useStorageState();
const { startLoading, finishLoading } = useLoadStatus();

const getData = async () => {
  const uid = userState.value.uid;
  startLoading();
  try {
    const data = await retriveRows(uid);
    rows.value = data;
  } catch (error) {
    console.log('❌ Error retriving data from server: ', error.message);
  } finally {
    finishLoading();
  }
};
const totalLostProfit = ref(0);

const calulateTotalLostProfit = (amount) => {
  totalLostProfit.value += amount;
};
onMounted(async () => {
  await getData();
});
</script>

<style scoped></style>
