import { adminInstance } from '#imports';
export default defineEventHandler(async (event) => {
  const admin = await adminInstance;

  if (!admin.apps.length) throw new Error('❌ Admin not initiated');

  const { uid, displayName, email } = await readBody(event);
  if (!uid)
    throw createError({
      statusCode: 500,
      statusMessage: '❌ No UID provided',
    });

  const db = admin.firestore();
  const docRef = db.collection('users').doc(uid);
  const snapShot = await docRef.get();

  if (snapShot.exists) {
    console.log('🔍 snapshot exists, no need to init a new one');
    return;
  }

  try {
    await docRef.set({
      displayName,
      email,
      uid,
      createdAt: new Date(),
      purchases: [],
    });

    return '✅ DB created';
  } catch (error) {
    console.log('❌ Error on createDoc Server: ', error.message);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '❌ Error on createDoc Server: ',
    });
  }
});
