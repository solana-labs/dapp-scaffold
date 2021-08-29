import SplToken from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { AccountInfo, SystemProgram } from "@solana/web3.js";
import { Button, Col, Input, Row, Spin } from "antd";
import React, { FC, useState } from "react";
import { useConnection } from "../../contexts/connection";

export const TokenMinting: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <form
      className="flexColumn container"
      style={{
        flex: 1,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "1em",
      }}
      onSubmit={() => {}}
    >
      <h3>Mint a token</h3>
      <Input
        type="number"
        placeholder="Amount"
        // value={amount}
        // onChange={(e) => setAmount(parseInt(e.target.value, 10))}
        required
      />
      <div className="spacer" />
      <Input
        type="text"
        placeholder="Destination"
        // value={destination}
        // onChange={(e) => setDestination(e.target.value)}
        required
      />
      <div className="spacer" />
      <Button disabled={isLoading} type="primary" htmlType="submit">
        {isLoading ? "Loading..." : "Mint a Token"}
      </Button>
      {isLoading ? <Spin spinning /> : null}
    </form>
  );
};
