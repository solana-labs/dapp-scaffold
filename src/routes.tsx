import { HashRouter, Route, Switch } from "react-router-dom";
import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { AccountsProvider } from "./contexts/accounts";
import { MarketProvider } from "./contexts/market";
import { AppLayout } from "./components/Layout";

import { FaucetView, HomeView } from "./views";
import {
  getLedgerWallet,
  getMathWallet,
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolongWallet,
  getTorusWallet,
} from "@solana/wallet-adapter-wallets";
import { AccountInformation } from "./views/accountInformation";
import { TokenMinting } from "./views/token-minting";
import { SendSolana } from "./views/send-solana";
import {
  ConnectionSettingsProvider,
  useConnectionSettings,
} from "./contexts/connectionSettings";
import { TokensProvider } from "./contexts/tokenMap";

export function RoutesWrapper() {
  return (
    <ConnectionSettingsProvider>
      <Routes />
    </ConnectionSettingsProvider>
  );
}

function Routes() {
  const connectionEndpoint = useConnectionSettings();
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getTorusWallet({
        options: {
          // TODO: Get your own tor.us wallet client Id
          clientId:
            "BOM5Cl7PXgE9Ylq1Z1tqzhpydY0RVr8k90QQ85N7AKI5QGSrr9iDC-3rvmy0K_hF0JfpLMiXoDhta68JwcxS1LQ",
        },
      }),
      getLedgerWallet(),
      getSolongWallet(),
      getMathWallet(),
      getSolletWallet(),
    ],
    []
  );

  return (
    <HashRouter basename={"/"}>
      <ConnectionProvider endpoint={connectionEndpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <TokensProvider>
            <AccountsProvider>
              <MarketProvider>
                <AppLayout>
                  <Switch>
                    <Route exact path="/" component={() => <HomeView />} />
                    <Route exact path="/faucet" children={<FaucetView />} />
                    <Route
                      exact
                      path="/account-information"
                      children={<AccountInformation />}
                    />
                    <Route
                      exact
                      path="/token-minting"
                      children={<TokenMinting />}
                    />
                    <Route
                      exact
                      path="/send-solana"
                      children={<SendSolana />}
                    />
                  </Switch>
                </AppLayout>
              </MarketProvider>
            </AccountsProvider>
          </TokensProvider>
        </WalletProvider>
      </ConnectionProvider>
    </HashRouter>
  );
}
