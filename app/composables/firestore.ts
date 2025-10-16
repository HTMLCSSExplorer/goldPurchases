export const useFirestore = () => {
  const { startLoading, finishLoading } = useLoadStatus();
  const serverData = useLocalStorage('server-data', []);

  const initFireStoreDoc = async (uid, email, displayName) => {
    try {
      await $fetch('/api/createDoc', {
        method: 'POST',
        body: {
          uid,
          email,
          displayName,
        },
      });
      return '✅ doc created ';
    } catch (error) {
      throw createError({
        statusCode: error.statusCode,
        statusMessage: error.statusMessage,
      });
    }
  };

  const getApiData = async () => {
    startLoading();
    try {
      const data = await $fetch('/api/data/fetchAllData');
      serverData.value = data;
    } catch (error) {
      console.log('❌ Error getting data from API server: ', error.message);
    } finally {
      finishLoading();
    }
  };

  return { initFireStoreDoc, getApiData };
};
