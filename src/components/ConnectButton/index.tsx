import { Button, Dropdown, Menu } from "antd";
import { ButtonProps } from "antd/lib/button";
import React from "react";
import { LABELS } from "../../constants";
import { useWallet } from "../../contexts/wallet";

export interface ConnectButtonProps
  extends ButtonProps,
    React.RefAttributes<HTMLElement> {
  allowWalletChange?: boolean;
}

export const ConnectButton = (props: ConnectButtonProps) => {
  const { connected, connect, select, provider } = useWallet();
  const { onClick, children, disabled, allowWalletChange, ...rest } = props;

  // only show if wallet selected or user connected

  const menu = (
    <Menu>
      <Menu.Item key="3" onClick={select}>
        Change Wallet
      </Menu.Item>
    </Menu>
  );

  if (!provider || !allowWalletChange) {
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
