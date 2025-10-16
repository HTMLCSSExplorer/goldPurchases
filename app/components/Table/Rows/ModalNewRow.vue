<template>
  <UModal
    v-if="userState.uid"
    v-model:open="open"
    :transition="false"
    title="Add a new purchase"
  >
    <UButton label="Open" color="warning" variant="solid" />

    <template #body>
      <UForm
        :disabled="isLoading"
        class="w-full space-y-8"
        :state="formData"
        :schema="newRowSchema"
        @submit="addNewRow"
      >
        <div class="flex gap-2 items-end">
          <UFormField name="coin" class="w-full" label="Coin *">
            <USelect
              v-model="formData.coin"
              :items="coins"
              class="w-full"
              color="warning"
            />
          </UFormField>

          <UFormField name="unit" class="w-full" label="Unit *">
            <UInput
              v-model="formData.unit"
              type="number"
              class="w-full"
              color="warning"
            />
          </UFormField>
        </div>

        <div class="flex items-end gap-2">
          <UFormField name="buyPrice" class="w-full" label="Buy Price *">
            <UInput
              v-model="formData.buyPrice"
              type="number"
              class="w-full"
              color="warning"
            />
          </UFormField>

          <div class="w-full">
            <UButton
              label="OK"
              class="w-full flex items-center justify-center cursor-pointer"
              color="warning"
              variant="subtle"
              type="submit"
            />
          </div>
        </div>
      </UForm>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
const { newRow } = useRows();
const { finishLoading, isLoading, startLoading } = useLoadStatus();
const { userState } = useUserState();

const open = ref(false);
const formData = ref({
  coin: '',
  unit: 0,
  buyPrice: 0,
});

const addNewRow = async () => {
  startLoading();

  const coin = formData.value.coin;
  const unit = formData.value.unit;
  const buyPrice = formData.value.buyPrice;

  try {
    const row = await newRow(coin, unit, buyPrice);
    formData.value.buyPrice = 0;
    formData.value.unit = 0;
    formData.value.coin = '';
    open.value = false;
  } catch (error) {
    console.log('❌ Error creating a new row: ', error.message);
  } finally {
    finishLoading();
  }
};
</script>

<style scoped></style>
