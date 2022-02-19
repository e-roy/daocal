import { getCloudFunction } from "../getCloudFunction";

export async function checkUserTokens() {
  const CheckUserTokens = await getCloudFunction("CheckUserTokens");
  const CheckUserTokensPromise = await CheckUserTokens();
  return CheckUserTokensPromise.data;
}

export async function createNewDao(contractAddress: string) {
  console.log("create dao with contract", contractAddress);
  const CreateDao = await getCloudFunction("CreateDao");
  const CreateDaoPromise = await CreateDao({
    contractAddress: contractAddress,
  });
  console.log(CreateDaoPromise);
}
