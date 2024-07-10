import { auth } from "./config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);

  return result;
};

export const signOut = async () => {
  return auth.signOut();
};
