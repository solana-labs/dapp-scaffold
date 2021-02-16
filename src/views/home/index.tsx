import React, { useEffect } from "react";
import { useConnectionConfig } from "../../contexts/connection";
import { useMarkets } from "../../contexts/market";

export const HomeView = () => {
  const { marketEmitter, midPriceInUSD } = useMarkets();
  const { tokenMap } = useConnectionConfig();

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
      1. Add wallet and value in $
      2. Link to faucet
    </div>
  );
};
