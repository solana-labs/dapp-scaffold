import type { PublicKey } from "@solana/web3.js";

import Wallet from "@project-serum/sol-wallet-adapter";
import { Transaction } from "@solana/web3.js";
import { Button, Modal } from "antd";
import EventEmitter from "eventemitter3";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { notify } from "./../utils/notifications";
import { useConnectionConfig } from "./connection";
import { useLocalStorageState } from "./../utils/utils";
import { LedgerWalletAdapter } from "../wallet-adapters/ledger";
import { SolongWalletAdapter } from "../wallet-adapters/solong";
import { PhantomWalletAdapter } from "../wallet-adapters/phantom";

const ASSETS_URL =
  "https://raw.githubusercontent.com/solana-labs/oyster/main/assets/wallets/";
export const WALLET_PROVIDERS = [
  {
    name: "Sollet",
    url: "https://www.sollet.io",
    icon: `${ASSETS_URL}sollet.svg`,
  },
  {
    name: "Solong",
    url: "https://solongwallet.com",
    icon: `${ASSETS_URL}solong.png`,
    adapter: SolongWalletAdapter,
  },
  {
    name: "Solflare",
    url: "https://solflare.com/access-wallet",
    icon: `${ASSETS_URL}solflare.svg`,
  },
  {
    name: "MathWallet",
    url: "https://mathwallet.org",
    icon: `${ASSETS_URL}mathwallet.svg`,
  },
  {
    name: "Ledger",
    url: "https://www.ledger.com",
    icon: `${ASSETS_URL}ledger.svg`,
    adapter: LedgerWalletAdapter,
  },
  {
    name: "Phantom",
    url: "https://phantom.app/",
    icon: `https://raydium.io/_nuxt/img/phantom.d9e3c61.png`,
    adapter: PhantomWalletAdapter,
  },
];

export interface WalletAdapter extends EventEmitter {
  publicKey: PublicKey | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  connect: () => any;
  disconnect: () => any;
}

const WalletContext = React.createContext<{
  wallet: WalletAdapter | undefined;
  connected: boolean;
  select: () => void;
  provider: typeof WALLET_PROVIDERS[number] | undefined;
}>({
  wallet: undefined,
  connected: false,
  select() {},
  provider: undefined,
});

export function WalletProvider({ children = null as any }) {
  const { endpoint } = useConnectionConfig();

  const [autoConnect, setAutoConnect] = useState(false);
  const [providerUrl, setProviderUrl] = useLocalStorageState("walletProvider");

  const provider = useMemo(
    () => WALLET_PROVIDERS.find(({ url }) => url === providerUrl),
    [providerUrl]
  );

  const wallet = useMemo(
    function () {
      if (provider) {
        return new (provider.adapter || Wallet)(
          providerUrl,
          endpoint
        ) as WalletAdapter;
      }
    },
    [provider, providerUrl, endpoint]
  );

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (wallet) {
      wallet.on("connect", () => {
        if (wallet.publicKey) {
          setConnected(true);
          const walletPublicKey = wallet.publicKey.toBase58();
          const keyToDisplay =
            walletPublicKey.length > 20
              ? `${walletPublicKey.substring(
                  0,
                  7
                )}.....${walletPublicKey.substring(
                  walletPublicKey.length - 7,
                  walletPublicKey.length
                )}`
              : walletPublicKey;

          notify({
            message: "Wallet update",
            description: "Connected to wallet " + keyToDisplay,
          });
        }
      });

      wallet.on("disconnect", () => {
        setConnected(false);
        notify({
          message: "Wallet update",
          description: "Disconnected from wallet",
        });
      });
    }

    return () => {
      setConnected(false);
      if (wallet) {
        wallet.disconnect();
      }
    };
  }, [wallet]);

  useEffect(() => {
    if (wallet && autoConnect) {
      wallet.connect();
      setAutoConnect(false);
    }

    return () => {};
  }, [wallet, autoConnect]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const select = useCallback(() => setIsModalVisible(true), []);
  const close = useCallback(() => setIsModalVisible(false), []);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connected,
        select,
        provider,
      }}
    >
      {children}
      <Modal
        title="Select Wallet"
        okText="Connect"
        visible={isModalVisible}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={close}
        width={400}
      >
        {WALLET_PROVIDERS.map((provider) => {
          const onClick = function () {
            setProviderUrl(provider.url);
            setAutoConnect(true);
            close();
          };

          return (
            <Button
              size="large"
              type={providerUrl === provider.url ? "primary" : "ghost"}
              onClick={onClick}
              icon={
                <img
                  alt={`${provider.name}`}
                  width={20}
                  height={20}
                  src={provider.icon}
                  style={{ marginRight: 8 }}
                />
              }
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                marginBottom: 8,
              }}
            >
              {provider.name}
            </Button>
          );
        })}
      </Modal>
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const { wallet, connected, provider, select } = useContext(WalletContext);
  return {
    wallet,
    connected,
    provider,
    select,
    publicKey: wallet?.publicKey,
    connect() {
      wallet ? wallet.connect() : select();
    },
    disconnect() {
      wallet?.disconnect();
    },
  };
}
