import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Button } from "antd";
import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ConnectButton } from "../../components/ConnectButton";
import { useNativeAccount } from "../../contexts/accounts";
import { useConnectionConfig } from "../../contexts/connection";
import { useMarkets } from "../../contexts/market";
import { formatNumber } from "../../utils/utils";

export const HomeView = () => {
  const { marketEmitter, midPriceInUSD } = useMarkets();
  const { tokenMap } = useConnectionConfig();
  const { account } = useNativeAccount();

  const balance = useMemo(() => formatNumber.format((account?.lamports || 0) / LAMPORTS_PER_SOL), [account]);

  useEffect(() => {
    const refreshTotal = () => {
      
    };

    const dispose = marketEmitter.onMarket(() => {
      refreshTotal();
    });

    refreshTotal();

    return () => {
      dispose();
    };
  }, [marketEmitter, midPriceInUSD, tokenMap]);

  return (
    <div className="flexColumn">
      TODO:
      Your balance: {balance} SOL

      <ConnectButton />
      <Link to="/faucet">
        <Button>Faucet</Button>
      </Link>
      2. Link to faucet
    </div>
  );
};
