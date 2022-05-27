import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback, useState } from 'react';
import { notify } from "../utils/notifications";
import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js-next";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { create_auction_house} from "../api/src/auction-house";

export const CreateAuctionHouse: FC = () => {
    let walletAddress = "";
    var AuctionAddress = "3EERzZ6dHvYKksjDuUECDTRNKENCw8NcN4LFFKj4C6th";


    
    const wallet = useWallet();
    if (wallet.connected && wallet.publicKey) {
        walletAddress = wallet.publicKey.toString()
        console.log("my pub wallet",wallet.publicKey.toString());
    }


    console.log("abc wallet details", { keypair: Keypair.generate().secretKey })
    function getCreateauctionhouse() {
        create_auction_house({ env: 'devnet', sfbp: 100, wallet : wallet}).then(x => {
            alert('Auction House Address: ' + x)
            AuctionAddress = x
            console.log("abc")
        })
    }
 
    return (
        <div>
            
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={getCreateauctionhouse} disabled={false}
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
