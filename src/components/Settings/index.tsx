import {
  DEFAULT_NETWORK_CONFIG_MAP,
  useConnectionContext,
  useWallet,
} from "@saberhq/use-solana";
import { Button, Select } from "antd";
import React from "react";

const NETWORKS = Object.entries(DEFAULT_NETWORK_CONFIG_MAP);

export const Settings = () => {
  const { connected, wallet } = useWallet();
  const { network, setNetwork } = useConnectionContext();

  return (
    <>
      <div style={{ display: "grid" }}>
        Network:{" "}
        <Select
          onSelect={setNetwork}
          value={network}
          style={{ marginBottom: 20 }}
        >
          {NETWORKS.map(([networkID, network]) => (
            <Select.Option value={networkID} key={networkID}>
              {network.name}
            </Select.Option>
          ))}
        </Select>
        {connected && (
          <Button type="primary" onClick={() => wallet?.disconnect()}>
            Disconnect
          </Button>
        )}
      </div>
    </>
  );
};
