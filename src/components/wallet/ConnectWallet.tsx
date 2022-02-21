import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from '../elements';
import { useConnect, useSignMessage, useAccount } from 'wagmi';
import { getMessageToken, getFirebaseToken, createMessage } from '../../utils/login/index';
import metamaskLogo from '@/images/metamask-logo.png';
import walletConnectLogo from '@/images/walletconnect-logo.png';

const ConnectWallet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [
    {
      data: { connector, connectors },
      loading
    },
    connect
  ] = useConnect();

  const [{}, signMessage] = useSignMessage();

  const [{ data: accountData }] = useAccount();

  const navigate = useNavigate();

  useEffect(() => {
    if (accountData) {
      setIsWalletConnected(true);
    }
  }, [accountData]);

  const handleSignIn = async () => {
    setIsProcessing(true);

    if (accountData?.address) {
      try {
        const address = accountData?.address as string;
        const messageToken = (await getMessageToken(address)) as string;

        const message = await createMessage(messageToken, address);
        const signRes = (await signMessage({ message: message })) as any;
        if (signRes.error) throw signRes.error;

        const firebaseToken = await getFirebaseToken(message, signRes.data);
        const allFunctions = await Promise.all([messageToken, message, signRes, firebaseToken]);
        setIsProcessing(false);
        return allFunctions;
      } catch (e) {
        console.log(e);
        setIsProcessing(false);
      }
    }
  };

  const handleConnectWallet = async (x: any) => {
    setIsProcessing(true);
    if (accountData?.address) {
      setIsModalOpen(false);
      try {
        await handleSignIn();
        setIsProcessing(false);
        // navigate('/directory');
      } catch (e) {
        console.log(e);
        setIsProcessing(false);
      }
    } else {
      setIsModalOpen(false);
      try {
        await connect(x);
        setIsProcessing(false);
      } catch (e) {
        console.log(e);
        setIsProcessing(false);
      }
    }
  };

  const handleConnectButton = async () => {
    setIsProcessing(true);
    if (accountData?.address) {
      try {
        await handleSignIn();
        setIsProcessing(false);
        // navigate('/directory');
      } catch (e) {
        console.log(e);
        setIsProcessing(false);
      }
    } else {
      setIsModalOpen(true);
      setIsProcessing(false);
    }
  };

  return (
    <div>
      {isProcessing ? (
        <Button disabled>Processing...</Button>
      ) : (
        <>
          {!isWalletConnected ? (
            <Button onClick={() => handleConnectButton()}>Connect Wallet</Button>
          ) : (
            <Button onClick={() => handleSignIn()}>Sign In with Ethereum</Button>
          )}
        </>
      )}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {connectors.map((x) => (
            <button
              className={'hover:bg-gray-100 text-gray-700 p-4 w-full rounded'}
              disabled={!x.ready}
              key={x.name}
              onClick={() => handleConnectWallet(x)}
            >
              <div>
                {x.name === 'MetaMask' && (
                  <img src={metamaskLogo} width={50} height={50} alt="MetaMask" className="mx-auto" />
                )}
                {x.name === 'WalletConnect' && (
                  <img src={walletConnectLogo} width={50} height={50} alt="Wallet Connect" className="mx-auto" />
                )}
              </div>
              <div className={'text-gray-900 text-3xl font-bold my-4'}>{x.name}</div>
              <div className={'text-gray-400 font-regular text-xl my-4'}>
                {x.name === 'MetaMask' && 'Connect to your MetaMask Wallet'}
                {x.name === 'WalletConnect' && 'Scan with WalletConnect to connect'}
              </div>
              <div>
                {!x.ready && ' (unsupported)'}
                {loading && x.name === connector?.name && '…'}
              </div>
            </button>
          ))}
        </Modal>
      )}
    </div>
  );
};

export default ConnectWallet;
