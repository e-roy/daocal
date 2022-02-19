import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { providers } from 'ethers';
import { Connector, Provider, chain, defaultChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
// import { WalletLinkConnector } from "wagmi/connectors/walletLink";

import './index.css';
import App from './App';

const chains = defaultChains;
const defaultChain = chain.mainnet;
const infuraId: string = import.meta.env.VITE_PROD_INFURA_ID;

// Set up connectors
type ConnectorsConfig = { chainId?: number };
const connectors = ({ chainId }: ConnectorsConfig) => {
  const rpcUrl = chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ?? defaultChain.rpcUrls[0];
  return [
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new WalletConnectConnector({
      chains,
      options: {
        infuraId,
        qrcode: true
      }
    })
    // new WalletLinkConnector({
    //   chains,
    //   options: {
    //     appName: 'wagmi',
    //     jsonRpcUrl: `${rpcUrl}/${infuraId}`,
    //   },
    // }),
  ];
};

// Set up providers
type ProviderConfig = { chainId?: number; connector?: Connector };
const isChainSupported = (chainId?: number) => chains.some((x) => x.id === chainId);

// Set up providers
const provider = ({ chainId }: ProviderConfig) =>
  providers.getDefaultProvider(isChainSupported(chainId) ? chainId : defaultChain.id, {
    infura: infuraId
  });
// const webSocketProvider = ({ chainId }: ConnectorsConfig) =>
//   isChainSupported(chainId)
//     ? new providers.InfuraWebSocketProvider(chainId, infuraId)
//     : undefined;

ReactDOM.render(
  <React.StrictMode>
    <Provider
      autoConnect
      connectors={connectors}
      provider={provider}
      // webSocketProvider={webSocketProvider}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
