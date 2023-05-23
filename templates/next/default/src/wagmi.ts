import { configureChains, createConfig } from 'wagmi';
import { goerli, polygonMumbai, polygon, mainnet } from 'wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai, goerli, polygon, mainnet],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains, options: { shimDisconnect: true } }),
    ...(typeof process.env.WALLET_CONNECT_PROJECT_ID === 'string'
      ? [
          new WalletConnectConnector({
            chains,
            options: {
              projectId: process.env.WALLET_CONNECT_PROJECT_ID,
            },
          }),
        ]
      : []),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'nori',
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});
