import firebaseApp from "../service/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

export async function getCloudFunction(name: string) {
  const functions = getFunctions(firebaseApp);
  return httpsCallable(functions, name);
}
