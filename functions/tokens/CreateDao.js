const functions = require('firebase-functions');
const admin = require('firebase-admin');
const ERC721 = require('@openzeppelin/contracts/build/contracts/ERC721.json');
const Contract = require('web3-eth-contract');
const alchemyKey = process.env.ALCHEMY_ID;

// const contractAddress = "0x25ed58c027921e14d86380ea2646e3a1b5c55a8b";

// const contractAddressPoly = '0x916B13FCa6192fE5e4E2cD58F712BA9Ade43CeD0';

const getDaoInfo = async (contractAddress, networkId) => {
  if (networkId === 1) Contract.setProvider(`https://eth-mainnet.alchemyapi.io/v2/${alchemyKey}`);
  else if (networkId === 137) Contract.setProvider(`https://polygon-mainnet.g.alchemy.com/v2/${alchemyKey}`);
  else return null;

  try {
    const contract = new Contract(ERC721.abi, contractAddress);
    const name = await contract.methods.name().call();
    const symbol = await contract.methods.symbol().call();

    return {
      name: name,
      symbol: symbol,
      address: contractAddress,
      network: networkId
    };
  } catch (error) {
    console.log('error', error);
    return null;
  }
};

const storeDaoInfo = async (info) => {
  const { name, symbol, address, network } = info;
  const setInfo = admin.firestore().collection('daos').doc(info.address).set({
    name: name,
    symbol: symbol,
    contract: address,
    network: network,
    created: Date.now()
  });
  return setInfo;
};

const CreateDao = functions.https.onCall(async (data, context) => {
  const { contractAddress, networkId } = data;

  // check if user is logged in
  if (!context.auth.token) return { error: 'Unauthorized' };
  if (!contractAddress || !networkId) return { error: 'missing fields' };

  // check if contract exists on network
  const info = await getDaoInfo(contractAddress, networkId);
  if (!info) return { error: 'invalid contract address or network' };

  // need check if doa calendar already created

  // need check is user has dao token in their wallet

  const storeInfo = await storeDaoInfo(info);
  console.log('storeInfo', storeInfo);
  if (storeInfo) return { success: 'success' };
  else return { error: 'error' };

  // return storeInfo;
});

module.exports = {
  CreateDao
};
