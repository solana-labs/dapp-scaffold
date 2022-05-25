// TODO: SignMessage
import bs58 from 'bs58';
import { FC, useCallback } from 'react';
import { sign } from 'tweetnacl';
import { notify } from "../utils/notifications";
import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl } from '@solana/web3.js'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { Connection } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, } from "@solana/spl-token";
import { actions }from "@metaplex/js";
const { mintNFT,} = actions;


export const SignMessage: FC = () => {
    const network = WalletAdapterNetwork.Devnet; 
    const wallets = [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter({ network }),
        ];
        const endpoint = clusterApiUrl(network);
    
        const connection = new Connection(endpoint);
        const { publicKey, signMessage } = useWallet();

        const hi =5;
    
       
        const wallet = useWallet();
    const onClick = useCallback(async () => {
        try {
            
            const uri = "https://gateway.pinata.cloud/ipfs/QmPjcp3L7wRDKxTMdgJBXgMwPhRab71cwLMNh5Wd2kwGTW"
            const nft = await mintNFT({connection,wallet,uri,})
            // const vault =  await createVault({connection,wallet,hi,wallet,});
           
            console.log(nft);
    }catch(err){
        console.log(err)
    }
}, [publicKey, notify, signMessage]);

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
                    Create NFTS From wallet
                </span>
            </button>
        </div>
    );
};
