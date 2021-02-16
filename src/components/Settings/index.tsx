import React from "react";
import { Button, Select } from "antd";
import { ENDPOINTS, useConnectionConfig } from "../../contexts/connection";
import { useWallet } from "../../contexts/wallet";

export const Settings = () => {
  const { connected, disconnect } = useWallet();
  const { endpoint, setEndpoint } = useConnectionConfig();

  return (
    <>
      <div style={{ display: "grid" }}>
        Network:{" "}
        <Select
          onSelect={setEndpoint}
          value={endpoint}
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
