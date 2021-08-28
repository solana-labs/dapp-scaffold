import { useWallet } from "@solana/wallet-adapter-react";
import { AccountInfo } from "@solana/web3.js";
import { Button, Col, Row, Spin } from "antd";
import React, { FC, useState } from "react";
import { useConnection } from "../../contexts/connection";
import "./styles.less";

export const TokenHandling: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div
      className="flexColumn container"
      style={{
        flex: 1,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "1em",
      }}
    >
      <Button onClick={() => {}}>
        Mint token
      </Button>
      {isLoading ? <Spin spinning /> : null}
    </div>
  );
};
