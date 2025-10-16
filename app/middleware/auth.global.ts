export default defineNuxtRouteMiddleware(async (to, from) => {
  const { getCurrentUser } = useAuth();
  const { userState } = useUserState();
  const { rows } = useStorageState();
  const { serverData } = useFirestore();

  const user = await getCurrentUser();
  if (user) {
    userState.value = user;
    return to.path === '/auth' ? navigateTo('/', { replace: true }) : '';
  }

  if (!user) {
    userState.value = [];
    rows.value = [];
    serverData.value = [];
    return to.path === '/' ? await navigateTo('/auth', { replace: true }) : '';
  }
});
