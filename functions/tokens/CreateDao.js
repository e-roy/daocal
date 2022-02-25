const functions = require('firebase-functions');
const admin = require('firebase-admin');
const ERC721 = require('@openzeppelin/contracts/build/contracts/ERC721.json');
const Contract = require('web3-eth-contract');

// const contractAddress = "0x25ed58c027921e14d86380ea2646e3a1b5c55a8b";

const getDaoInfo = async (contractAddress) => {
  // console.log(contractAddress);
  Contract.setProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_ID}`);
  const contract = new Contract(ERC721.abi, contractAddress);
  const name = await contract.methods.name().call();
  const symbol = await contract.methods.symbol().call();

  //   console.log("contract", contract);
  return {
    name: name,
    symbol: symbol,
    address: contractAddress,
    network: 1
  };
};

const storeDaoInfo = async (info) => {
  const { name, symbol, address, network } = info;
  admin.firestore().collection('daos').doc(info.address).set({
    name: name,
    symbol: symbol,
    contract: address,
    network: network,
    created: Date.now()
  });
};

const CreateDao = functions.https.onCall(async ({ contractAddress }, context) => {
  // check if user is logged in
  if (!context.auth.token) return { error: 'Unauthorized' };
  // need check if contract exists

  // need check is user has dao token in their wallet

  // console.log(contractAddress);
  // console.log(userAddress);
  //   if (!contract) return { error: "address is required" };
  const info = await getDaoInfo(contractAddress);
  // console.log("CREATE DAO INFO", info);

  await storeDaoInfo(info);

  return 'success';
});

module.exports = {
  CreateDao
};
