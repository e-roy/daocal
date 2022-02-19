import { initializeApp, getApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
// import { getStorage, connectStorageEmulator } from "firebase/storage";

const config = {
  apiKey: import.meta.env.VITE_PROD_API_KEY,
  authDomain: import.meta.env.VITE_PROD_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROD_PROJECT_ID,
  storageBucket: import.meta.env.VITE_PROD_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_PROD_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_PROD_APP_ID,
  measurementId: import.meta.env.VITE_PROD_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(config);
const analytics = getAnalytics(firebaseApp);
logEvent(analytics, "notification_received");

export default firebaseApp;

const auth = getAuth();
const db = getFirestore();
const functions = getFunctions(getApp());
// const storage = getStorage();

if (window.location.hostname === "localhost") {
  // auth emulator working
  connectAuthEmulator(auth, "http://localhost:9099");
  // firestore emulator working
  connectFirestoreEmulator(db, "localhost", 8080);
  // functions emulator working
  connectFunctionsEmulator(functions, "localhost", 5001);
  // connectStorageEmulator(storage, "localhost", 9199);
}
