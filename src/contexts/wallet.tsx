import {
  useSolana,
  useWallet,
  WalletProviderInfo,
  WalletType,
  WALLET_PROVIDERS,
} from "@saberhq/use-solana";
import { Button, Modal } from "antd";
import React, { useCallback, useContext, useState } from "react";
import { isMobile } from "react-device-detect";
import { notify } from "../utils/notifications";

const SORTED_WALLET_PROVIDERS: readonly [
  WalletType,
  WalletProviderInfo
][] = (Object.entries(WALLET_PROVIDERS) as readonly [
  WalletType,
  WalletProviderInfo
][])
  .filter(([, p]) => (isMobile ? p.isMobile : true))
  .slice()
  .sort(([, a], [, b]) =>
    (a.isInstalled?.() ?? true) === (b.isInstalled?.() ?? true)
      ? a.name < b.name
        ? -1
        : 1
      : a.isInstalled?.() ?? true
      ? -1
      : 1
  );

const WalletContext = React.createContext<{
  select: () => void;
}>({
  select() {},
});

export function WalletProvider({ children = null as any }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const select = useCallback(() => setIsModalVisible(true), []);
  const close = useCallback(() => setIsModalVisible(false), []);
  const { activate, provider: activeProvider } = useSolana();

  return (
    <WalletContext.Provider
      value={{
        select,
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
        {SORTED_WALLET_PROVIDERS.map(([walletType, provider]) => {
          const onClick = function () {
            if (mustInstall) {
              window.open(provider.url, "_blank", "noopener noreferrer");
              return;
            }
            try {
              activate(walletType);
            } catch (e) {
              notify({
                type: "error",
                message: "Error connecting wallet",
                description: `${provider.name}: ${e.message}`,
              });
            }
            close();
          };

          const mustInstall = provider.isInstalled?.() === false;
          const icon =
            typeof provider.icon === "string" ? (
              <img
                src={provider.icon}
                alt={`Icon of provider ${provider.name}`}
                width={20}
                height={20}
              />
            ) : (
              <provider.icon width={20} height={20} />
            );

          return (
            <Button
              key={provider.url}
              size="large"
              type={activeProvider?.url === provider.url ? "primary" : "ghost"}
              onClick={onClick}
              icon={icon}
              style={{
                width: "100%",
                display: "flex",
                gap: 8,
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              {mustInstall ? `Install ${provider.name}` : provider.name}
            </Button>
          );
        })}
      </Modal>
    </WalletContext.Provider>
  );
}

export function useWalletSelector() {
  const { select } = useContext(WalletContext);
  const { wallet } = useWallet();
  return {
    select,
    publicKey: wallet?.publicKey,
    connect() {
      wallet ? wallet.connect() : select();
    },
  };
}
