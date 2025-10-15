export const useUserState = () => {
  const userState = useLocalStorage('user-state', {});

  return { userState };
};
