import { error } from 'firebase-functions/logger';
import { getDB } from '~~/server/utils/db';

export default defineEventHandler(async (event) => {
  const db = await getDB();
  const { id, uid } = await readBody(event);
  if (!id) throw new Error('❌ Purchase ID invalid or not provided');
  if (!uid) throw new Error('❌ invalid user ID');

  const docRef = db.collection('users').doc(uid);
  let updatePurchases = [];

  const snapShot = await docRef.get();

  if (!snapShot.exists) throw new Error('❌ No documents found.');

  updatePurchases = await snapShot
    .data()
    ?.purchases.filter((purchas) => purchas.id !== id);

  try {
    await docRef.update({
      purchases: updatePurchases,
    });
  } catch (error) {
    console.log('❌ Error deleting purchase', error.message);
    return;
  }
});
