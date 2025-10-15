export const useFirestore = () => {
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

  return { initFireStoreDoc };
};
