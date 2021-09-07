import { TokenInfo, TokenListProvider } from "@solana/spl-token-registry";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import React, { FC, useEffect, useMemo, useState } from "react";
import { cache, getMultipleAccounts, MintParser } from "./accounts";
import { ENDPOINTS, useConnectionSettings } from "./connectionSettings";

const TokenMapContext = React.createContext<{
  tokens: TokenInfo[];
  tokenMap: Map<string, TokenInfo>;
}>({
  tokenMap: new Map(),
  tokens: [],
});

export const TokensProvider: FC = ({ children }) => {
  const connectionEndpoint = useConnectionSettings();
  const { connection } = useConnection();
  const chain = ENDPOINTS.find((i) => i.endpoint === connectionEndpoint)!;
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map());
  useEffect(() => {
    cache.clear();
    (async () => {
      const res = await new TokenListProvider().resolve();
      const list = res
        .filterByChainId(chain.chainID)
        .excludeByTag("nft")
        .getList();
      const knownMints = list.reduce((map, item) => {
        map.set(item.address, item);
        return map;
      }, new Map<string, TokenInfo>());

      const accounts = await getMultipleAccounts(
        connection,
        [...knownMints.keys()],
        "single"
      );
      accounts.keys.forEach((key, index) => {
        const account = accounts.array[index];
        if (!account) {
          return;
        }

        cache.add(new PublicKey(key), account, MintParser);
      });

      setTokenMap(knownMints);
      setTokens(list);
    })();
  }, [connection, chain]);
  const value = useMemo(() => ({ tokens, tokenMap }), [tokens, tokenMap]);
  return (
    <TokenMapContext.Provider value={value}>
      {children}
    </TokenMapContext.Provider>
  );
};

export const useTokens = () => {
  const context = React.useContext(TokenMapContext);
  if (context === undefined) {
    throw new Error("useTokens must be used within a TokensProvider");
  }
  return context;
};
