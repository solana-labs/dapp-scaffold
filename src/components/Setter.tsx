import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey, sendAndConfirmTransaction, Transaction, TransactionInstruction } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { notify } from "../utils/notifications";

// The state of a greeting account managed by the hello world program
class GreetingAccount {
  counter = 0;
  constructor(fields: {counter: number} | undefined = undefined) {
    if (fields) {
      this.counter = fields.counter;
    }
  }
}

// Borsh schema definition for greeting accounts
const GreetingSchema = new Map([
  [GreetingAccount, {kind: 'struct', fields: [['counter', 'u32']]}],
]);

export const Setter: FC = () => {
    const { publicKey } = useWallet();
    const { connection } = useConnection();

    const onClick = useCallback(async () => {
        try {
          // gitpod で作った ID
          const greeterPublicKey = new PublicKey('FASELKXUc16qecVvQJHWaKWcWbwcgVVBqeUCPnJXho2X');
          // Program ID
          const programKey = new PublicKey('3YRmRuUYLWamMER87YZWMqXcsQUMEHkChU9pQDCXqzZg');
          // gitpod からパクってきた
          const payerSecretKey = new Uint8Array(JSON.parse('[1,63,212,96,8,63,6,83,157,233,57,177,183,240,59,163,166,137,172,117,156,67,251,237,237,180,61,169,162,114,187,22,156,147,254,191,235,26,149,180,39,179,17,213,226,128,31,160,231,63,252,104,37,186,172,106,196,213,138,237,97,122,253,248]'));
          const payerKeypair = Keypair.fromSecretKey(payerSecretKey);

          // this your turn to figure out
          // how to create this instruction
          const instruction = new TransactionInstruction({
            keys: [{pubkey: greeterPublicKey, isSigner: false, isWritable: true}],
            programId: programKey,
            data: Buffer.alloc(0), // All instructions are hellos
          });

          const transaction = new Transaction().add(instruction);
          
          await sendAndConfirmTransaction(
            connection,
            transaction,
            [payerKeypair],
          );

          notify({ type: 'success', message: 'Success!' });
        } catch (error: any) {
            notify({ type: 'error', message: `Sign Message failed!`, description: error?.message });
            console.log('error', `Sign Message failed! ${error?.message}`);
        }
    }, [publicKey, connection, notify]);

    return (
        <div>
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={onClick} disabled={!publicKey}
            >
                <div className="hidden group-disabled:block">
                    Wallet not connected
                </div>
                <span className="block group-disabled:hidden" > 
                    Setter
                </span>
            </button>
        </div>
    );
};
