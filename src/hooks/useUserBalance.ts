import { PublicKey } from "@solana/web3.js";
import { useEffect, useMemo, useState } from "react";
import { useMint } from "../contexts/accounts";
import { useMarkets } from "../contexts/market";
import { fromLamports } from "../utils/utils";
import { useUserAccounts } from "./useUserAccounts";

export function useUserBalance(
  mintAddress?: PublicKey | string,
  account?: PublicKey
) {
  const mint = useMemo(
    () =>
      typeof mintAddress === "string" ? mintAddress : mintAddress?.toBase58(),
    [mintAddress]
  );
  const { userAccounts } = useUserAccounts();
  const [balanceInUSD, setBalanceInUSD] = useState(0);
  const { marketEmitter, midPriceInUSD } = useMarkets();

  const mintInfo = useMint(mint);
  const accounts = useMemo(() => {
    return userAccounts
      .filter(
        (acc) =>
          mint === acc.info.mint.toBase58() &&
          (!account || account.equals(acc.pubkey))
      )
      .sort((a, b) => b.info.amount.sub(a.info.amount).toNumber());
  }, [userAccounts, mint, account]);

  const balanceLamports = useMemo(() => {
    return accounts.reduce(
      (res, item) => (res += item.info.amount.toNumber()),
      0
    );
  }, [accounts]);

  const balance = useMemo(() => fromLamports(balanceLamports, mintInfo), [
    mintInfo,
    balanceLamports,
  ]);

  useEffect(() => {
    const updateBalance = () => {
      setBalanceInUSD(balance * midPriceInUSD(mint || ""));
    };

    const dispose = marketEmitter.onMarket((args) => {
      updateBalance();
    });

    updateBalance();

    return () => {
      dispose();
    };
  }, [balance, midPriceInUSD, marketEmitter, mint, setBalanceInUSD]);

  return {
    balance,
    balanceLamports,
    balanceInUSD,
    accounts,
    hasBalance: accounts.length > 0 && balance > 0,
  };
}
