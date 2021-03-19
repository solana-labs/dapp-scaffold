import { useEffect, useState } from "react";
import { cache } from "../contexts/accounts";
import { useMarkets } from "../contexts/market";
import { fromLamports } from "../utils/utils";
import { useUserAccounts } from "./useUserAccounts";

export function useUserTotalBalance() {
  const { userAccounts } = useUserAccounts();
  const [balanceInUSD, setBalanceInUSD] = useState(0);
  const { marketEmitter, midPriceInUSD } = useMarkets();

  useEffect(() => {
    const updateBalance = () => {
      let total = 0;
      for (let i = 0; i < userAccounts.length; i++) {
        const account = userAccounts[i];
        const mintAddress = account.info.mint.toBase58();
        const mint = cache.get(mintAddress);
        if (mint) {
          const balance = fromLamports(account.info.amount.toNumber(), mint.info);
          total += balance * midPriceInUSD(mintAddress);
        }
      }


      setBalanceInUSD(total);
    };

    const dispose = marketEmitter.onMarket((args) => {
      updateBalance();
    });

    updateBalance();

    return () => {
      dispose();
    };
  }, [userAccounts, marketEmitter, midPriceInUSD, setBalanceInUSD]);

  return {
    balanceInUSD,
    accounts: userAccounts,
    hasBalance: userAccounts.length > 0 && balanceInUSD > 0,
  };
}
