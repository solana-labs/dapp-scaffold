import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback, useState } from 'react';
import { notify } from "../utils/notifications";
import useUserSOLBalanceStore from '../stores/useUserSOLBalanceStore';
import { Connection, PublicKey } from '@solana/web3.js';
import styles from './RequestAirdrop.module.css'

const requestAirdrop = async (connection: Connection, publicKey: PublicKey | null, getUserSOLBalance: (publicKey: PublicKey, connection: Connection) => void) => {
    if (!publicKey) {
        console.log('error', 'Wallet not connected!');
        notify({ type: 'error', message: 'error', description: 'Wallet not connected!' });
        return;
    }

    let signature: TransactionSignature = '';

    try {
        signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
        await connection.confirmTransaction(signature, 'confirmed');
        notify({ type: 'success', message: 'Airdrop successful!', txid: signature });

        getUserSOLBalance(publicKey, connection);
    } catch (error: any) {
        notify({ type: 'error', message: `Airdrop failed!`, description: error?.message, txid: signature });
        console.log('error', `Airdrop failed! ${error?.message}`, signature);
    }
};

export const RequestAirdrop: FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const { getUserSOLBalance } = useUserSOLBalanceStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onClick = useCallback(async () => {
        setIsSubmitting(true);
        await requestAirdrop(connection, publicKey, getUserSOLBalance);
        setIsSubmitting(false);
    }, [connection, publicKey, getUserSOLBalance]);

    return (
        <div>
            <button id="button" className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
                onClick={onClick}
                disabled={isSubmitting}>
                {isSubmitting && <div className={styles.submitting}></div>}
                <span>Airdrop 1</span>
            </button>
        </div>
    );
};
