import React from "react";
import { Button, Select } from "antd";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  ENDPOINTS,
  useConnectionSettings,
  useConnectionSettingsActions,
} from "../../contexts/connectionSettings";

export const Settings = () => {
  const { connected, disconnect } = useWallet();
  const connectionEndpoint = useConnectionSettings();
  const { setConnetionEndpoint } = useConnectionSettingsActions();

  return (
    <>
      <div style={{ display: "grid" }}>
        Network:{" "}
        <Select
          onSelect={(option) => {
            setConnetionEndpoint(ENDPOINTS.find((i) => i.endpoint === option)!);
          }}
          value={connectionEndpoint}
          style={{ marginBottom: 20 }}
        >
          {ENDPOINTS.map(({ name, endpoint }) => (
            <Select.Option value={endpoint} key={endpoint}>
              {name}
            </Select.Option>
          ))}
        </Select>
        {connected && (
          <Button type="primary" onClick={disconnect}>
            Disconnect
          </Button>
        )}
      </div>
    </>
  );
};
