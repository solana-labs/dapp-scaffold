import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { FC, useCallback } from 'react';
import { notify } from "../utils/notifications";
import {
    reportGreetings,
  } from '../utils/helloworld';
import {
    PublicKey,
    TransactionInstruction,
    Transaction,
  } from '@solana/web3.js';

export const SayHello = () => {
    const { connection } = useConnection();
    const { publicKey, wallet, sendTransaction } = useWallet();

    const onClick = useCallback(async () => {
        if (!publicKey) {
            notify({ type: 'error', message: `Wallet not connected!` });
            console.log('error', `Send Transaction: Wallet not connected!`);
            return;
        }

        notify({ type: 'success', message: 'Saying Hello' });

        try {

            const programId = new PublicKey('YPWSCenv6uhXHKE74pCA3RzqJgx2QJJBsnPSeb9BHNp')
            const GREETING_SEED = 'hello';
            let payerPublicKey = new PublicKey('3iGdRcLLJ1iuUf7MRAFMA6mCAhiWjarST8qhZWG5D3Bn')
            const greetedPubkey = await PublicKey.createWithSeed(
                payerPublicKey, //payer.publicKey,
                GREETING_SEED,
                programId,
            );

            const instruction = new TransactionInstruction({
                keys: [{pubkey: greetedPubkey, isSigner: false, isWritable: true}],
                programId,
                data: Buffer.alloc(0), // All instructions are hellos
            });
            const transaction = new Transaction().add(instruction)
            const { blockhash } = await connection.getRecentBlockhash()
            transaction.recentBlockhash = blockhash
            transaction.feePayer = payerPublicKey
            let signedTransaction = await wallet.adapter.signTransaction(transaction)
            const txid = await connection.sendRawTransaction(
                signedTransaction.serialize()
            )
            const greetingReport = await reportGreetings();
            notify({ type: 'success', txid, message: `Transaction Success: ${greetingReport}` });    
        } catch (error) {
            notify({ type: 'error', message: `Transaction failed!`, description: error?.message });
            return;
        }
    }, [publicKey, notify, connection, sendTransaction]);

    return (
        <div>
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={onClick} disabled={!publicKey}
            >
                <div className="hidden group-disabled:block ">
                    Wallet not connected
                </div>
                <span className="block group-disabled:hidden" > 
                    Say Hello
                </span>
            </button>
        </div>
    );
};
