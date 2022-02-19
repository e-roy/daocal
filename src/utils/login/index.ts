import firebaseApp from "../../service/firebase";
import { getCloudFunction } from "../getCloudFunction";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { SiweMessage } from "siwe";

export async function createMessage(
  messageToken: string,
  address: string | undefined
) {
  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement: "Sign in with Ethereum to the app.",
    uri: window.location.origin,
    version: "1",
    chainId: 1,
    nonce: messageToken,
  });
  return message.prepareMessage();
}

export async function getMessageToken(address: string) {
  const createMessageToken = await getCloudFunction("createMessageToken");
  const messageTokenPromise = await createMessageToken({ address: address });
  return messageTokenPromise.data;
}

export async function getFirebaseToken(message: string, signature: string) {
  const createFirebaseToken = await getCloudFunction("createFirebaseToken");
  const firebaseTokenPromise: any = await createFirebaseToken({
    message,
    signature,
  });
  if (firebaseTokenPromise.data) {
    const auth = getAuth(firebaseApp);
    return signInWithCustomToken(auth, firebaseTokenPromise.data);
  }
}
