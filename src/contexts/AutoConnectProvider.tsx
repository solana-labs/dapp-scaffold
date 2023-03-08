import { useLocalStorage } from '@solana/wallet-adapter-react';
import { createContext, ReactNode, useContext } from 'react';

export interface AutoConnectContextState {
  autoConnect: boolean;
  setAutoConnect(autoConnect: boolean): void;
}

export const AutoConnectContext = createContext<AutoConnectContextState>(
  {} as AutoConnectContextState
);

export function useAutoConnect(): AutoConnectContextState {
  return useContext(AutoConnectContext);
}

export const AutoConnectProvider = ({ children }: { children: ReactNode }) => {
  // TODO: fix auto connect to actual reconnect on refresh/other.
  // TODO: make switch/slider settings
  // const [autoConnect, setAutoConnect] = useLocalStorage('autoConnect', false);
  const [autoConnect, setAutoConnect] = useLocalStorage('autoConnect', true);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AutoConnectContext.Provider value={{ autoConnect, setAutoConnect }}>
      {children}
    </AutoConnectContext.Provider>
  );
};
