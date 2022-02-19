import React, { useState } from "react";
import { Modal } from "../elements";
import { useConnect, useSignMessage, useAccount } from "wagmi";
import {
  getMessageToken,
  getFirebaseToken,
  createMessage,
} from "../../utils/login/index";
import { getAuth, signOut } from "firebase/auth";
import metamaskLogo from "@/images/metamask-logo.png";
import walletConnectLogo from "@/images/walletconnect-logo.png";

const auth = getAuth();

export type ConnectWalletProps = {
  currentUser: string | null;
  firebaseLoading: boolean;
};

const ConnectWallet = ({
  currentUser,
  firebaseLoading,
}: ConnectWalletProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [
    {
      data: { connector, connectors },
      loading,
    },
    connect,
  ] = useConnect();

  const [{}, signMessage] = useSignMessage();

  const [{ data: accountData }, disconnect] = useAccount();

  const handleSignIn = async (x: any) => {
    const messageToken: any = await connect(x)
      .then((res: any) => {
        const address: string = res.data?.account;
        setIsModalOpen(false);
        return getMessageToken(address);
      })
      .catch((e) => {
        console.log(e);
      });
    const message = await createMessage(messageToken, accountData?.address);
    const signRes = await signMessage({ message: message });
    if (signRes.error) throw signRes.error;

    await getFirebaseToken(message, signRes.data);
  };

  if (firebaseLoading) return null;

  if (currentUser)
    return (
      <button
        onClick={() => {
          signOut(auth);
          disconnect();
        }}
      >
        logout
      </button>
    );

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Connect Wallet</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {connectors.map((x) => (
          <button
            className={"hover:bg-gray-100 text-gray-700 p-4 w-full rounded"}
            disabled={!x.ready}
            key={x.name}
            onClick={() => {
              handleSignIn(x);
            }}
          >
            <div>
              {x.name === "MetaMask" && (
                <img
                  src={metamaskLogo}
                  width={50}
                  height={50}
                  alt="MetaMask"
                  className="mx-auto"
                />
              )}
              {x.name === "WalletConnect" && (
                <img
                  src={walletConnectLogo}
                  width={50}
                  height={50}
                  alt="Wallet Connect"
                  className="mx-auto"
                />
              )}
            </div>
            <div className={"text-gray-900 text-3xl font-bold my-4"}>
              {x.name}
            </div>
            <div className={"text-gray-400 font-regular text-xl my-4"}>
              {x.name === "MetaMask" && "Connect to your MetaMask Wallet"}
              {x.name === "WalletConnect" &&
                "Scan with WalletConnect to connect"}
            </div>
            <div>
              {!x.ready && " (unsupported)"}
              {loading && x.name === connector?.name && "…"}
            </div>
          </button>
        ))}
      </Modal>
    </div>
  );
};

export default ConnectWallet;
