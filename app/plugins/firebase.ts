

import { getAuth } from 'firebase/auth';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public;

  const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
  };

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

  const $auth = getAuth(app);
  const $db = getFirestore(app);

  nuxtApp.provide('auth', $auth);
  nuxtApp.provide('db', $db);
});


