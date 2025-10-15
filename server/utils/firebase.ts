import admin from 'firebase-admin';

export const initAdmin = async () => {
  const config = useRuntimeConfig();

  // const cert = JSON.parse(
  //   readFileSync(config.GOOGLE_APPLICATION_CREDENTIALS, 'utf-8')
  // );

  // console.log(JSON.stringify(json));

  try {
     console.log('⚙️  Initializing Firebase Admin...');
    
  const cert = JSON.parse(config.GOOGLE_APPLICATION_CREDENTIALS);

    if (!cert) throw new Error('Missing GOOGLE_APPLICATION_CREDENTIALS env');


  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(cert),
    });
  }
    console.log('✅ Firebase Admin initialized');
  return admin;
    
  } catch (err) {
     console.error('🔥 Firebase Admin init failed:', err);
      throw err;
  }


};

export const adminInstance = initAdmin();
