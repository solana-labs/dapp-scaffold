import React, {
  createContext,
  Dispatch,
  FC,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { ENV as ChainID } from "@solana/spl-token-registry";
import { clusterApiUrl } from "@solana/web3.js";

export type ENV = "mainnet-beta" | "testnet" | "devnet" | "localnet";

export const ENDPOINTS = [
  {
    name: "mainnet-beta" as ENV,
    endpoint: "https://solana-api.projectserum.com/",
    chainID: ChainID.MainnetBeta,
  },
  {
    name: "testnet" as ENV,
    endpoint: clusterApiUrl("testnet"),
    chainID: ChainID.Testnet,
  },
  {
    name: "devnet" as ENV,
    endpoint: clusterApiUrl("devnet"),
    chainID: ChainID.Devnet,
  },
  {
    name: "localnet" as ENV,
    endpoint: "http://127.0.0.1:8899",
    chainID: ChainID.Devnet,
  },
] as const;

const DEFAULT = ENDPOINTS[0].endpoint;

const ConnectionSettingsContext = createContext<string>(DEFAULT);
const ConnectionSettingsDispatchContext = createContext<Dispatch<string>>(
  null!
);

export const ConnectionSettingsProvider: FC = ({ children }) => {
  const [connectionSettings, setConnectionSettings] = useReducer<
    Reducer<string, string>
  >(
    (_, newConnectionSettings) => newConnectionSettings,
    localStorage.getItem("connectionSettings") ?? DEFAULT
  );
  useEffect(() => {
    localStorage.setItem("connectionSettings", connectionSettings);
  }, [connectionSettings]);
  return (
    <ConnectionSettingsDispatchContext.Provider value={setConnectionSettings}>
      <ConnectionSettingsContext.Provider value={connectionSettings}>
        {children}
      </ConnectionSettingsContext.Provider>
    </ConnectionSettingsDispatchContext.Provider>
  );
};

export const useConnectionSettings = () =>
  useContext(ConnectionSettingsContext);

export const useConnectionSettingsActions = () => {
  const dispatch = useContext(ConnectionSettingsDispatchContext);
  if (!dispatch) {
    throw new Error(
      "useConnectionSettingsActions must be used within a ConnectionSettingsProvider"
    );
  }
  return {
    setConnetionEndpoint: (endpoint: typeof ENDPOINTS[number]) => {
      dispatch(endpoint.endpoint);
    },
  };
};
