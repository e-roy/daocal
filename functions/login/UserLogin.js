const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const { generateNonce } = require("siwe");
const { ethers } = require("ethers");
const { SiweMessage } = require("siwe");

// Server side functions

const createToken = (account, nonce) => {
  const message = ethers.utils.hashMessage(`${account}::${nonce}`);
  return message;
};

// Exported functions

const createMessageToken = functions.https.onCall(async ({ address }, _) => {
  if (!address) return { error: "address is required" };
  console.log("createMessageToken", address);
  const nonce = await generateNonce();
  admin
    .firestore()
    .collection("users")
    .doc(address)
    .set({ uid: address, nonce: nonce });
  return createToken(address, nonce);
});

const createFirebaseToken = functions.https.onCall(
  async ({ message, signature }, _) => {
    if (!message || !signature) return { error: "missing required" };
    const siweMessage = new SiweMessage(message);
    const fields = await siweMessage.validate(signature);
    const { address, nonce } = fields;
    const doc = await admin.firestore().collection("users").doc(address).get();
    const storedNonce = doc.data().nonce;
    const checkToken = createToken(address, storedNonce);

    if (nonce === checkToken) {
      const claims = { user: true };
      return await getAuth().createCustomToken(address, claims);
    } else {
      return { error: "invalid nonce" };
    }
  }
);

module.exports = {
  createMessageToken,
  createFirebaseToken,
};
