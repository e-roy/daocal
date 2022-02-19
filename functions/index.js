const { initializeApp } = require("firebase-admin/app");
const app = initializeApp({
  serviceAccountId: "daocal@appspot.gserviceaccount.com",
});

module.exports = {
  // user login
  ...require("./login/UserLogin"),
  // check token
  ...require("./tokens/CheckUserTokens"),
  // create dao
  ...require("./tokens/CreateDao"),
};
