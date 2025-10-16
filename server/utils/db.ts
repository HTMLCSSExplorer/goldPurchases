import { adminInstance } from '#imports';

let _db: FirebaseFirestore.Firestore | null = null;

export const getDB = async () => {
  if (_db) return _db;

  const admin = await adminInstance;
  _db = admin.firestore();
  return _db;
};
