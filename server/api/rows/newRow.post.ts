import { FieldValue } from 'firebase-admin/firestore';
import { getDB } from '~~/server/utils/db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = await getDB();

  if (!body) throw new Error('❌ Body cannot be empty');

  try {
    const docRef = db.collection('users').doc(body.uid);
    await docRef.update({
      purchases: FieldValue.arrayUnion(body.newRow),
    });
  } catch (error) {
    console.log('❌Error adding a new row: ', error.message);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '❌Error adding a new row: ',
    });
  }
});
