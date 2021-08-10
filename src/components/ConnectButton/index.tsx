import { useWallet } from "@solana/wallet-adapter-react";
import { WalletName } from "@solana/wallet-adapter-wallets";
import { Button, Dropdown, Menu } from "antd";
import { ButtonProps } from "antd/lib/button";
import React from "react";
import { LABELS } from "../../constants";

export interface ConnectButtonProps
  extends ButtonProps,
    React.RefAttributes<HTMLElement> {
  allowWalletChange?: boolean;
}

export const ConnectButton = (props: ConnectButtonProps) => {
  const { connected, connect, select, wallet } = useWallet();
  const { onClick, children, disabled, allowWalletChange, ...rest } = props;

  // only show if wallet selected or user connected
  const menu = (
    <Menu>
      {Object.entries(WalletName).map(([key, value]) => (
        <Menu.Item key="3" onClick={() => select(key as WalletName)}>
          Change Wallet to {value}
        </Menu.Item>
      ))}
    </Menu>
  );

  if (!wallet || !allowWalletChange) {
    return (
      <Button
        {...rest}
        onClick={connected ? onClick : connect}
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
