import { getDB } from '~~/server/utils/db';

export default defineEventHandler(async (event) => {
  const { uid } = await readBody(event);
  if (!uid) throw new Error('❌ Uid is not provided');
  const db = await getDB();
  const docRef = db.collection('users').doc(uid);
  let purchases = [];

  try {
    const snapShot = await docRef.get();

    if (!snapShot.exists) {
      throw createError({
        statusCode: 504,
        statusMessage: '❌ snapShot not found',
      });
    }

    purchases = snapShot.data()?.purchases;

    return purchases;
  } catch (error) {
    console.log('❌ error getting purchases from server: ', error.message);
    throw createError({
      statusCode: error.statusCode || 501,
      statusMessage:
        error.statusMessage || '❌ error getting purchases from server',
    });
  }
});
