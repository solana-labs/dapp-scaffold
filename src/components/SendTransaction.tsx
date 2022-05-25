import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { notify } from "../utils/notifications";
import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js-next";
import { Connection, clusterApiUrl } from "@solana/web3.js";


export const SendTransaction: FC = () => {
  
const connection = new Connection(clusterApiUrl("devnet"));
const key = [241,36,206,100,79,200,113,139,170,207,119,101,252,209,150,2,161,58,164,177,255,82,219,49,29,197,5,56,103,63,202,171,97,63,34,254,204,12,41,81,0,240,61,177,193,227,2,152,46,158,197,203,159,32,60,47,223,62,153,63,57,217,160,108]
              

const secret = new Uint8Array(key)

const wallet = Keypair.fromSecretKey(secret,true);
const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(bundlrStorage());

    const onClick = useCallback(async () => {
        
        console.log("minting NFT to your address, will take 5-10 seconds")
        try {
            const { nft } = await metaplex.nfts().create({
              uri: "https://gateway.pinata.cloud/ipfs/QmZ24mVxarhtkt63X4UV9zjno4BZ2JWKodao3L6RnxPHBj",
        
          });
        
        const myNfts = await metaplex.nfts().findAllByOwner(metaplex.identity().publicKey);
      


          console.log(myNfts);
        } catch(err) {
          console.log(err);
        }
    }, [ notify, connection]);

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
                    Send Transaction 
                </span>
            </button>
        </div>
    );
};
