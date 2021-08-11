import { useWalletModal } from "@solana/wallet-adapter-ant-design";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button, Dropdown, Menu } from "antd";
import { ButtonProps } from "antd/lib/button";
import React, { useCallback } from "react";
import { LABELS } from "../../constants";

export interface ConnectButtonProps
  extends ButtonProps,
    React.RefAttributes<HTMLElement> {
  allowWalletChange?: boolean;
}

export const ConnectButton = (props: ConnectButtonProps) => {
  const { setVisible } = useWalletModal();

  const { connected, connect, select, wallet, wallets } = useWallet();
  const { onClick, children, disabled, allowWalletChange, ...rest } = props;

  const handleChangeWalletButtonClick: React.MouseEventHandler<HTMLElement> = useCallback(
    (event) => {
      if (connected) {
        onClick?.(event);
        return;
      }
      setVisible(true);
    },
    [setVisible, onClick, connected]
  );

  // only show if wallet selected or user connected
  const menu = (
    <Menu>
      {wallets.map((wallet) => (
        <Menu.Item key={wallet.name} onClick={() => select(wallet.name)}>
          Change Wallet to {wallet.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  if (!wallet || !allowWalletChange) {
    return (
      <Button
        {...rest}
        onClick={handleChangeWalletButtonClick}
        disabled={connected && disabled}
      >
        {connected ? props.children : LABELS.CONNECT_LABEL}
      </Button>
    );
  }

  return (
    <Dropdown.Button
      onClick={connected ? onClick : connect}
      disabled={connected && disabled}
      overlay={menu}
    >
      {LABELS.CONNECT_LABEL}
    </Dropdown.Button>
  );
};
