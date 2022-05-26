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
        create_auction_house({ env: 'devnet', sfbp: 1000, ccsp: false, rso: false, keypair: [1,90,27,228,91,62,245,81,208,23,124,206,118,237,164,26,237,156,197,60,139,77,178,90,5,35,34,5,108,97,244,121,240,51,231,189,237,131,63,125,244,114,198,95,83,103,122,253,64,106,180,25,123,16,45,99,224,225,121,156,142,237,80,152]}).then(x => {
            alert('Auction House Address: ' + x)
            AuctionAddress = x
            console.log("abc")
        })
    }
    // const connection = new Connection(clusterApiUrl("devnet"));
    // const key =[1,90,27,228,91,62,245,81,208,23,124,206,118,237,164,26,237,156,197,60,139,77,178,90,5,35,34,5,108,97,244,121,240,51,231,189,237,131,63,125,244,114,198,95,83,103,122,253,64,106,180,25,123,16,45,99,224,225,121,156,142,237,80,152]
    // const secret = new Uint8Array(key)
    // const wallet = Keypair.fromSecretKey(secret, true);
    // const metaplex = Metaplex.make(connection)
    //     .use(keypairIdentity(wallet))
    //     .use(bundlrStorage());

    // const onClick = useCallback(async () => {

    //     console.log("minting NFT to your address, will take 5-10 seconds")
    //     try {
    //         const { nft } = await metaplex.nfts().create({
    //             uri: "https://gateway.pinata.cloud/ipfs/QmZ24mVxarhtkt63X4UV9zjno4BZ2JWKodao3L6RnxPHBj",

    //         });
    //         console.log("Created NFT",nft);

    //     } catch (err) {
    //         console.log(err);
    //     }
    // }, [notify, connection]);


    return (
        <div>
            
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={getCreateauctionhouse} disabled={0}
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
