// firebaseConfig.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAWHgwct2uW-WOtallr-2SqeQpxRvEkOR0",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "bd-listacompra",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID",
};

const app = initializeApp(firebaseConfig);
export default app;
