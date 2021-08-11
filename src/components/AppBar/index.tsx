import React from "react";
import { Button, Popover } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Settings } from "../Settings";
import { LABELS } from "../../constants";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-ant-design";
import { useWallet } from "@solana/wallet-adapter-react";

export const AppBar = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  const { connected } = useWallet();
  const TopBar = (
    <div className="App-Bar-right">
      <WalletMultiButton />
      <div style={{ margin: 5 }} />
      {connected ? <WalletDisconnectButton /> : null}
      <Popover
        placement="topRight"
        title={LABELS.SETTINGS_TOOLTIP}
        content={<Settings />}
        trigger="click"
      >
        <Button
          shape="circle"
          size="large"
          type="text"
          icon={<SettingOutlined />}
        />
      </Popover>
      {props.right}
    </div>
  );

  return TopBar;
};
