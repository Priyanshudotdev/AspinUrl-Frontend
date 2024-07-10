// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth,GoogleAuthProvider} from 'firebase/auth';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API_KEY,

  authDomain: import.meta.env.VITE_FIRE_BASE_AUTH_DOMAIN,

  projectId: import.meta.env.VITE_FIRE_BASE_PROJECT_ID,

  storageBucket: import.meta.env.VITE_FIRE_BASE_STORAGE_BUCKET,

  messagingSenderId: import.meta.env.VITE_FIRE_BASE_MSG_SENDER_ID,
  
  appId: import.meta.env.VITE_FIRE_BASE_APP_ID
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();