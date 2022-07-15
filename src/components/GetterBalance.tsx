import { useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { FC, useCallback, useEffect, useState } from 'react';
import { notify } from "../utils/notifications";

export const GetterBalance: FC = () => {
    const { connection } = useConnection();
    const [balance, setBalance] = useState<number>(0);
    const [address, setAddress] = useState<string>('');

    useEffect(() => {
      const lsAddress = localStorage.getItem('solanaAddress');
      if (lsAddress) {
        setAddress(lsAddress);
      }
    }, []);

    const onClick = useCallback(async () => {
        try {
          const publicKey = new PublicKey(address);
          const _balance = await connection.getBalance(publicKey);
          setBalance(_balance / LAMPORTS_PER_SOL);
        } catch (error: any) {
            notify({ type: 'error', message: `Sign Message failed!`, description: error?.message });
            console.log('error', `Sign Message failed! ${error?.message}`);
        }
    }, [address, balance, notify]);

    return (
        <div>
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={onClick} disabled={!address}
            >
                <div className="hidden group-disabled:block">
                    No Account
                </div>
                <span className="block group-disabled:hidden" > 
                    Get Balance
                </span>
            </button>
            <p>BALANCE : {balance} SOL</p>
        </div>
    );
};
