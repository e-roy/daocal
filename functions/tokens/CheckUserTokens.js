const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { ethers } = require('ethers');

// alchemy-nft-api/alchemy-web3-script.js
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');

// Replace with your Alchemy api key:
const alchemyKey = process.env.ALCHEMY_ID;
// Initialize an alchemy-web3 instance:
const alchemyETH = createAlchemyWeb3(`https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`);

const alchemyPoly = createAlchemyWeb3(`https://polygon-mainnet.g.alchemy.com/v2/${alchemyKey}`);

const testContract = '0x25ed58c027921e14d86380ea2646e3a1b5c55a8b';

const testAddress = '0x4738c97a2752b2fc171659e46103c36110466673';

const getAllDaoContracts = async () => {
  let contractAddresses = [];
  const daoContracts = await admin.firestore().collection('daos').get();
  daoContracts.forEach((dao) => {
    contractAddresses.push(dao.data().contract);
  });
  return contractAddresses;
};

const getDaoInfo = async (daoAddress) => {
  const daoContract = await admin.firestore().collection('daos').doc(daoAddress).get();
  if (daoContract.exists) return daoContract.data();
  return {};
};

const checkUserStoredDaoTokens = async (address, daoAddress) => {
  const daoTokens = await admin.firestore().collection('users').doc(address).collection('daos').doc(daoAddress).get();
  if (daoTokens.exists) return daoTokens.data().tokens;
  return [];
};

const updateUserDaoTokens = async (address, daoAddress, confirmedDaoTokens) => {
  const daoInfo = await getDaoInfo(daoAddress);
  const findTokens = async () => {
    let tokens = [];
    for (let i = 0; i < confirmedDaoTokens.length; i++) {
      let metadata = {};
      const nftMetaData = await alchemyETH.alchemy.getNftMetadata({
        contractAddress: daoAddress,
        tokenId: confirmedDaoTokens[i].id.tokenId
      });
      metadata = { ...nftMetaData.metadata };
      metadata.tokenId = ethers.BigNumber.from(confirmedDaoTokens[i].id.tokenId).toString();
      tokens.push(metadata);
    }
    return tokens;
  };
  const tokens = await findTokens();
  daoInfo.tokens = tokens;
  admin
    .firestore()
    .collection('users')
    .doc(address)
    .collection('daos')
    .doc(daoAddress)
    .set({ ...daoInfo });
};

const checkContract = async (address) => {
  const allDaoContracts = await getAllDaoContracts();

  const nfts = await alchemyETH.alchemy.getNfts({
    owner: address
  });

  //   const polyNfts = await alchemyPoly.alchemy.getNfts({
  //     owner: address,
  //   });
  //   console.log(polyNfts);

  for (const daoAddress of allDaoContracts) {
    const confirmedDaoTokens = nfts.ownedNfts.filter((nft) => {
      return nft.contract.address.toLowerCase() === daoAddress.toLowerCase();
    });

    const storedTokens = await checkUserStoredDaoTokens(address, daoAddress);
    if (confirmedDaoTokens.length > 0 || storedTokens.length > 0)
      updateUserDaoTokens(address, daoAddress, confirmedDaoTokens);
  }

  return 'success';
};

const CheckUserTokens = functions.https.onCall(async (_, context) => {
  if (!context.auth.token) return { error: 'Unauthorized' };
  const info = await checkContract(context.auth.token.user_id);
  // const info = await checkContract(testAddress);

  console.log('INFO', info);
  return 'success';
});

module.exports = {
  CheckUserTokens
};
