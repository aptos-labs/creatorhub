/* eslint-disable import/no-extraneous-dependencies */
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { Network } from "@aptos-labs/ts-sdk";
import { AptosWalletAdapterProvider, useWallet } from "@aptos-labs/wallet-adapter-react";
// eslint-disable-next-line import/no-cycle
import { createBrowserHistory } from "history";
import { useEffect } from "react";
import { ConfigProvider } from "antd";
import IndexerProvider from "aptos-creator-studio-tools/providers/IndexerProvider";
import PayloadProvider from "aptos-creator-studio-tools/providers/PayloadProvider";
import NetworkProvider, { useNetworkContext } from "aptos-creator-studio-tools/providers/NetworkProvider";
import TransactionProvider from "aptos-creator-studio-tools/providers/TransactionProvider";

import { AppRoutes } from "./routes";
import { getWallets } from "./utils/getWallets";
import { getNetwork } from "./components/NetworkChecker";


const NetworkWrappedProviders = () => {
  const {account, signAndSubmitTransaction} = useWallet();
  const {network} = useNetworkContext()
  return (
    <PayloadProvider>
      <TransactionProvider account={account} network={network} signAndSubmitTransaction={signAndSubmitTransaction}>
        <IndexerProvider network={network}>
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  itemBg: "transparent",
                },
              },
            }}>
            <AppRoutes />
          </ConfigProvider>
        </IndexerProvider>
      </TransactionProvider>
    </PayloadProvider>
  )
}

const WrappedAppProviders = () => {
  const {network} = useWallet();
  return (
    <NetworkProvider accountNetwork={network}>
      <NetworkWrappedProviders />
    </NetworkProvider>
  )
}

function App(this: any) {
  const browserHistory = createBrowserHistory();
  const network =
    getNetwork(new URLSearchParams(window.location.search).get("network")) ??
    Network.MAINNET;

  useEffect(() => {
    if (
      !getNetwork(new URLSearchParams(window.location.search).get("network"))
    ) {
      browserHistory.push(`?network=${Network.MAINNET}`);
    }
  });
  return (
    <AptosWalletAdapterProvider plugins={getWallets(network)} autoConnect={true}>
      <WrappedAppProviders />
    </AptosWalletAdapterProvider>
  );
}

export default App;
