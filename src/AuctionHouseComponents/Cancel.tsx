import { useWallet } from '@solana/wallet-adapter-react';
import { FC, useCallback, useState } from 'react';

import { cancel} from "../api/src/auction-house";

export const Cancel: FC = () => {
    let walletAddress = "";
    var AuctionAddress = "3EERzZ6dHvYKksjDuUECDTRNKENCw8NcN4LFFKj4C6th";

    
    const wallet = useWallet();
    if (wallet.connected && wallet.publicKey) {
        walletAddress = wallet.publicKey.toString()
        console.log("my pub wallet ===>",walletAddress);
    }


    function getCancel() {
       
    }
    
    return (
        <div>
            
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={getCancel} disabled={false}
            >
                <div className="hidden group-disabled:block ">
                    Wallet not connected
                </div>
                <span className="block group-disabled:hidden" >
                    Cancel
                </span>
            </button>
        </div>
    );
};
