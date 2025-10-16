<template>
  <div>
    <header class="flex justify-between p-10">
      <UButton
        v-if="userState.uid"
        :disabled="isLoading"
        label="sign out"
        color="warning"
        @click="handleSignOut"
      />
      <TableRowsModalNewRow />
    </header>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const { userState } = useUserState();
const { signOutUser } = useAuth();
const { finishLoading, isLoading, startLoading } = useLoadStatus();
const handleSignOut = async () => {
  startLoading();

  try {
    await signOutUser();
    await navigateTo('/');
    window.location.reload();
  } catch (error) {
    console.log('❌ Error signing user out: ', error.message);
  } finally {
    finishLoading();
  }
};
</script>

<style scoped></style>
