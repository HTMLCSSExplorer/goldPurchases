import { v4 as uuid } from 'uuid';

export const useRows = () => {
  const { rows } = useStorageState();
  const { userState } = useUserState();

  const newRow = async (coin: string, unit: number, buyPrice: number) => {
    if (coin && unit && buyPrice) {
      const newRow = {
        id: uuid(),
        createdAt: new Date(),
        coin,
        unit,
        buyPrice,
      };
      rows.value.push(newRow);
      await $fetch('/api/rows/newRow', {
        method: 'POST',
        body: {
          uid: userState.value.uid,
          newRow,
        },
      });
      return;
    }
    console.log('❌ Check all inputs');
  };

  const retriveRows = async (uid) => {
    try {
      const purchases = await $fetch('/api/rows/getPurchases', {
        method: 'POST',
        body: {
          uid,
        },
      });
      return purchases;
    } catch (error) {
      console.log('❌ Error getting data: ', error.message);
    }
  };

  return { newRow, retriveRows };
};
