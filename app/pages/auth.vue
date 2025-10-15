<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <UButton
      :disabled="isLoading"
      label="login"
      color="warning"
      class="flex items-center justify-center uppercase font-bold text-6xl px-16 py-8 cursor-pointer"
      @click="loginWithGoogle"
    />
  </div>
</template>

<script lang="ts" setup>
const { signInWithGoogle } = useAuth();
const { startLoading, finishLoading, isLoading } = useLoadStatus();
const { userState } = useUserState();

const loginWithGoogle = async () => {
  startLoading();
  try {
    const user = await signInWithGoogle();
    console.log('✅ user logged in with google');
    userState.value = user;
    await navigateTo('/', { replace: true });
  } catch (error) {
    console.log('❌ Cannot login with google: ', error.message);
  } finally {
    finishLoading();
  }
};
</script>

<style scoped></style>
