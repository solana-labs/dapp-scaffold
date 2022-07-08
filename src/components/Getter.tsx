import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { FC, useCallback, useState } from 'react';
import { notify } from "../utils/notifications";
import * as borsh from 'borsh';

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

export const Getter: FC = () => {
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const [counter, setCounter] = useState<number>(0);

    const onClick = useCallback(async () => {
        try {

          // gitpod で作った ID
          const greeterPublicKey = new PublicKey('FASELKXUc16qecVvQJHWaKWcWbwcgVVBqeUCPnJXho2X');
      
          const accountInfo = await connection.getAccountInfo(greeterPublicKey);
      
          if (accountInfo === null) {
            throw new Error('Error: cannot find the greeted account');
          }
      
          // Find the expected parameters.
          const greeting = borsh.deserialize(
            GreetingSchema,
            GreetingAccount,
            accountInfo.data,
          );
          setCounter(greeting.counter);
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
                    Getter
                </span>
            </button>
            <p>Counter : {counter}</p>
        </div>
    );
};
