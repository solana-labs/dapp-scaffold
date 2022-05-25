import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback, useState } from 'react';
import { notify } from "../utils/notifications";
import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js-next";
import { Connection, clusterApiUrl } from "@solana/web3.js";


export const CreateNFTS: FC = () => {

  
    const connection = new Connection(clusterApiUrl("devnet"));
    const key = [209, 180, 0, 24, 29, 165, 237, 25, 23, 223, 195, 104, 4, 250, 94, 117, 156, 224, 109, 59, 57, 110, 0, 175, 249, 192, 56, 65, 140, 117, 250, 54, 63, 146, 28, 49, 99, 138, 186, 87, 72, 58, 49, 194, 199, 238, 116, 4, 42, 74, 153, 96, 191, 217, 29, 177, 228, 150, 27, 87, 60, 186, 34, 16]
    const secret = new Uint8Array(key)
    const wallet = Keypair.fromSecretKey(secret, true);
    const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(wallet))
        .use(bundlrStorage());

    const onClick = useCallback(async () => {

        console.log("minting NFT to your address, will take 5-10 seconds")
        try {
            const { nft } = await metaplex.nfts().create({
                uri: "https://gateway.pinata.cloud/ipfs/QmZ24mVxarhtkt63X4UV9zjno4BZ2JWKodao3L6RnxPHBj",

            });
            console.log("Created NFT",nft);

        } catch (err) {
            console.log(err);
        }
    }, [notify, connection]);


    return (
        <div>
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={onClick} disabled={0}
            >
                <div className="hidden group-disabled:block ">
                    Wallet not connected
                </div>
                <span className="block group-disabled:hidden" >
                    Create NFTS
                </span>
            </button>
           
        </div>
    );
};
