export default defineNuxtRouteMiddleware(async (to, from) => {
  const { getCurrentUser } = useAuth();
  const { userState } = useUserState();

  const user = await getCurrentUser();
  if (user) {
    userState.value = user;
    return to.path === '/auth' ? navigateTo('/', { replace: true }) : '';
  }

  if (!user) {
    userState.value = [];
    return to.path === '/' ? await navigateTo('/auth', { replace: true }) : '';
  }
});
