import { HashRouter, Route, Switch } from "react-router-dom";
import React from "react";
import { WalletProvider } from "./contexts/wallet";
import { ConnectionProvider } from "./contexts/connection";
import { AccountsProvider } from "./contexts/accounts";
import { MarketProvider } from "./contexts/market";
import { AppLayout } from "./components/Layout";

import { FaucetView, HomeView } from "./views";
import {
  ConnectedWallet,
  SolanaProvider,
  WalletAdapter,
} from "@saberhq/use-solana";
import { notify } from "./utils/notifications";

const onConnect = (wallet: ConnectedWallet) => {
  const walletPublicKey = wallet.publicKey.toBase58();
  const keyToDisplay =
    walletPublicKey.length > 20
      ? `${walletPublicKey.substring(0, 7)}.....${walletPublicKey.substring(
          walletPublicKey.length - 7,
          walletPublicKey.length
        )}`
      : walletPublicKey;

  notify({
    message: "Wallet update",
    description: "Connected to wallet " + keyToDisplay,
  });
};

const onDisconnect = (wallet: WalletAdapter) => {
  notify({
    message: "Wallet update",
    description: "Disconnected from wallet",
  });
};

export function Routes() {
  return (
    <>
      <HashRouter basename={"/"}>
        <SolanaProvider onConnect={onConnect} onDisconnect={onDisconnect}>
          <ConnectionProvider>
            <WalletProvider>
              <AccountsProvider>
                <MarketProvider>
                  <AppLayout>
                    <Switch>
                      <Route exact path="/" component={() => <HomeView />} />
                      <Route exact path="/faucet" children={<FaucetView />} />
                    </Switch>
                  </AppLayout>
                </MarketProvider>
              </AccountsProvider>
            </WalletProvider>
          </ConnectionProvider>
        </SolanaProvider>
      </HashRouter>
    </>
  );
}
