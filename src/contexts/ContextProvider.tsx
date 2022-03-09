import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider as ReactUIWalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
    // LedgerWalletAdapter,
    // SlopeWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Commitment, ConnectionConfig } from '@solana/web3.js';
import { FC, ReactNode, useCallback, useMemo, useState, useEffect } from 'react';
import { AutoConnectProvider, useAutoConnect } from './AutoConnectProvider';
import { notify } from "../utils/notifications";

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { autoConnect } = useAutoConnect();
    const [ networkSelectVal ] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('network_val');
        };
    });

    useEffect (() => {
        localStorage.setItem('network_val', networkSelectVal);
    }, [networkSelectVal]);

    // TODO: WALLET ADAPTER IN GENERAL NEEDS WORK, CONNECTING DIFFERENT WALLETS, REFRESH, EVENTS

    let network = WalletAdapterNetwork.Devnet
    if (networkSelectVal == 'devnet') {
        network = WalletAdapterNetwork.Devnet;
    }
    else if (networkSelectVal == 'testnet') {
        network = WalletAdapterNetwork.Testnet;
    }
    else if (networkSelectVal == 'mainnet') {
        network = WalletAdapterNetwork.Mainnet;
    }
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new SolletWalletAdapter({ network }),
            new SolletExtensionWalletAdapter({ network }),
            new TorusWalletAdapter(),
            // new LedgerWalletAdapter(),
            // new SlopeWalletAdapter(),
        ],
        [network]
    );

    const onError = useCallback(
        (error: WalletError) => {
            notify({ type: 'error', message: error.message ? `${error.name}: ${error.message}` : error.name });
            console.error(error);
        },
        []
    );
    if (networkSelectVal == 'localhost') {
        let localhost = "http://127.0.0.1:8899";
        let commitment: Commitment = 'processed';
        let config: ConnectionConfig = {
            commitment: commitment
        };
        return (
            // TODO: updates needed for updating and referencing endpoint: wallet adapter rework
            <ConnectionProvider endpoint={localhost} config={config}>
                <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect}>
                    <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        );
    }
    return (
        // TODO: updates needed for updating and referencing endpoint: wallet adapter rework
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect}>
                <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <AutoConnectProvider>
            <WalletContextProvider>{children}</WalletContextProvider>
        </AutoConnectProvider>
    );
};
