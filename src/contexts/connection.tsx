import { Network } from "@saberhq/solana";
import { useConnectionContext, WalletAdapter } from "@saberhq/use-solana";
import {
  ENV as ChainID,
  TokenInfo,
  TokenListProvider,
} from "@solana/spl-token-registry";
import {
  Account,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import React, { useContext, useEffect, useState } from "react";
import { ExplorerLink } from "../components/ExplorerLink";
import { setProgramIds } from "../utils/ids";
import { notify } from "./../utils/notifications";
import { useLocalStorageState } from "./../utils/utils";
import { cache, getMultipleAccounts, MintParser } from "./accounts";

const CHAIN_IDS: { [C in Network]: ChainID } = {
  "mainnet-beta": ChainID.MainnetBeta,
  devnet: ChainID.Devnet,
  testnet: ChainID.Testnet,
  localnet: ChainID.Testnet,
};

const DEFAULT_SLIPPAGE = 0.25;

interface ConnectionConfig {
  slippage: number;
  setSlippage: (val: number) => void;
  tokens: TokenInfo[];
  tokenMap: Map<string, TokenInfo>;
}

const ConnectionContext = React.createContext<ConnectionConfig>({
  slippage: DEFAULT_SLIPPAGE,
  setSlippage: (val: number) => {},
  tokens: [],
  tokenMap: new Map<string, TokenInfo>(),
});

export function ConnectionProvider({ children = undefined as any }) {
  const { connection, network } = useConnectionContext();
  const [slippage, setSlippage] = useLocalStorageState(
    "slippage",
    DEFAULT_SLIPPAGE.toString()
  );

  const chain = CHAIN_IDS[network];

  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map());
  useEffect(() => {
    cache.clear();
    // fetch token files
    (async () => {
      const res = await new TokenListProvider().resolve();
      const list = res.filterByChainId(chain).excludeByTag("nft").getList();
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

  setProgramIds(network);

  return (
    <ConnectionContext.Provider
      value={{
        slippage: parseFloat(slippage),
        setSlippage: (val) => setSlippage(val.toString()),
        tokens,
        tokenMap,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnectionConfig() {
  const context = useContext(ConnectionContext);
  return {
    tokens: context.tokens,
    tokenMap: context.tokenMap,
  };
}

export function useSlippageConfig() {
  const { slippage, setSlippage } = useContext(ConnectionContext);
  return { slippage, setSlippage };
}

const getErrorForTransaction = async (connection: Connection, txid: string) => {
  // wait for all confirmation before geting transaction
  await connection.confirmTransaction(txid, "max");

  const tx = await connection.getParsedConfirmedTransaction(txid);

  const errors: string[] = [];
  if (tx?.meta && tx.meta.logMessages) {
    tx.meta.logMessages.forEach((log) => {
      const regex = /Error: (.*)/gm;
      let m;
      while ((m = regex.exec(log)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }

        if (m.length > 1) {
          errors.push(m[1]);
        }
      }
    });
  }

  return errors;
};

export const sendTransaction = async (
  connection: Connection,
  wallet: WalletAdapter,
  instructions: TransactionInstruction[],
  signers: Account[],
  awaitConfirmation = true
) => {
  if (!wallet?.publicKey) {
    throw new Error("Wallet is not connected");
  }

  let transaction = new Transaction();
  instructions.forEach((instruction) => transaction.add(instruction));
  transaction.recentBlockhash = (
    await connection.getRecentBlockhash("max")
  ).blockhash;
  transaction.setSigners(
    // fee payied by the wallet owner
    wallet.publicKey,
    ...signers.map((s) => s.publicKey)
  );
  if (signers.length > 0) {
    transaction.partialSign(...signers);
  }
  transaction = await wallet.signTransaction(transaction);
  const rawTransaction = transaction.serialize();
  let options = {
    skipPreflight: true,
    commitment: "singleGossip",
  };

  const txid = await connection.sendRawTransaction(rawTransaction, options);

  if (awaitConfirmation) {
    const status = (
      await connection.confirmTransaction(
        txid,
        options && (options.commitment as any)
      )
    ).value;

    if (status?.err) {
      const errors = await getErrorForTransaction(connection, txid);
      notify({
        message: "Transaction failed...",
        description: (
          <>
            {errors.map((err) => (
              <div>{err}</div>
            ))}
            <ExplorerLink address={txid} type="transaction" />
          </>
        ),
        type: "error",
      });

      throw new Error(
        `Raw transaction ${txid} failed (${JSON.stringify(status)})`
      );
    }
  }

  return txid;
};
