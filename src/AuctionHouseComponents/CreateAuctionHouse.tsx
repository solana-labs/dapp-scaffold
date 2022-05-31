import { useWallet } from '@solana/wallet-adapter-react';
import { FC, useCallback, useState } from 'react';

import { create_auction_house} from "../api/src/auction-house";

export const CreateAuctionHouse: FC = () => {
    let walletAddress = "";
    var AuctionAddress 


    const { publicKey } = useWallet();
    const wallet = useWallet();
    if (wallet.connected && wallet.publicKey) {
        walletAddress = wallet.publicKey.toString()
    }


    function getCreateauctionhouse() {
        create_auction_house({ env: 'devnet', sfbp: 100, ccsp: 100, rso: true, wallet : wallet}).then(x => {
            alert('Auction House Address: ' + x)
            AuctionAddress = x
        })
    }
    
    return (
        <div>
            
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={getCreateauctionhouse} disabled={!publicKey}
            >
                <div className="hidden group-disabled:block ">
                    Wallet not connected
                </div>
                <span className="block group-disabled:hidden" >
                    Create Auction House
                </span>
            </button>
        </div>
    );
};
