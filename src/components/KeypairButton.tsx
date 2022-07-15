import { Keypair } from '@solana/web3.js';
import { FC, useCallback, useEffect, useState } from 'react';
import { notify } from "../utils/notifications";

export const KeypairButton: FC = () => {
    const [address, setAddress] = useState<string>('');
    const [secret, setSecret] = useState<string>('');

    useEffect(() => {
      const lsAddress = localStorage.getItem('solanaAddress');
      if (lsAddress) {
        setAddress(lsAddress);
      }
      const lsSecret = localStorage.getItem('solanaSecret');
      if (lsSecret) {
        setSecret(lsSecret);
      }
    }, []);

    const onClick = useCallback(async () => {
        try {
          const keypair = Keypair.generate();
          const address = keypair.publicKey.toString();
          setAddress(address);
          localStorage.setItem('solanaAddress', address);
          const secret = JSON.stringify(Array.from(keypair.secretKey));
          setSecret(secret);
          localStorage.setItem('solanaSecret', secret);
        } catch (error: any) {
            notify({ type: 'error', message: `Sign Message failed!`, description: error?.message });
            console.log('error', `Sign Message failed! ${error?.message}`);
        }
    }, [address, secret, notify]);

    return (
        <div>
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={onClick} disabled={!!address}
            >
                <div className="hidden group-disabled:block">
                    Created Account
                </div>
                <span className="block group-disabled:hidden" > 
                    Create Account
                </span>
            </button>
            <p>Save LoaclStorage</p>
            <p>Address : {address}</p>
            <p>Secret : {secret}</p>
        </div>
    );
};
