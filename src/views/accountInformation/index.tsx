import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { AccountInfo } from "@solana/web3.js";
import { Button, Col, Row, Spin } from "antd";
import React, { FC, useState } from "react";

export const AccountInformation: FC = () => {
  const [accountInfo, setAccountInfo] = useState<AccountInfo<Buffer> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const handleGetAccountInfoClick = async () => {
    try {
      if (!publicKey) return alert("Please connect to your wallet first");
      const accountInfo = await connection.getAccountInfo(publicKey!);
      setAccountInfo(accountInfo);
      setIsLoading(true);
    } finally {
      setIsLoading(false);
    }
  };
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
      <Button onClick={handleGetAccountInfoClick}>
        Get Account Information from Wallet
      </Button>
      {isLoading ? <Spin spinning /> : null}
      {accountInfo && !isLoading ? (
        <Col>
          <Row>
            <b>Is executable?&nbsp;</b>
            <span>{accountInfo.executable ? "Yes" : "No"}</span>
          </Row>
          <Row>
            <b>Lamports:&nbsp;</b>
            <span>
              {accountInfo.lamports} ({accountInfo.lamports / 1000000000} SOL)
            </span>
          </Row>
          <Row>
            <b>Owner:&nbsp;</b>
            <span>
              {accountInfo.owner.toString()}
              {accountInfo.owner.toBase58() ===
              "11111111111111111111111111111111"
                ? " (System)"
                : ""}
            </span>
          </Row>
          <Row>
            <b>Data:&nbsp;</b>
            <span>
              Account (<code>accountInfo.data</code>) serialization is program
              agnostic.
            </span>
          </Row>
        </Col>
      ) : null}
    </div>
  );
};
