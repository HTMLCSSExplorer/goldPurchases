export const useLoadStatus = () => {
  const loadBar = useLoadingIndicator();
  const isLoading = useState('is-loading', () => {
    return false;
  });

  const startLoading = () => {
    isLoading.value = true;
    loadBar.start();
  };

  const finishLoading = () => {
    isLoading.value = false;
    loadBar.finish();
  };

  return { finishLoading, startLoading, isLoading };
};
