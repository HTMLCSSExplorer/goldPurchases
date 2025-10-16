export const useStorageState = () => {
  const rows = useLocalStorage('rows', []);

  return { rows };
};
