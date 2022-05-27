import { useWallet } from '@solana/wallet-adapter-react';
import { FC, useCallback, useState } from 'react';

import { buy } from "../api/src/auction-house";

export const Buy: FC = () => {
    let walletAddress = "";
    
    const [price, setPrice] = useState(''); // '' is the initial state value
    const [mintAddress, setMintAddress] = useState(''); // '' is the initial state value
    const [auctionHouseAddress,setAuctionHouseAddress]= useState(''); // '' is the initial state value
    
    const wallet = useWallet();
    if (wallet.connected && wallet.publicKey) {
        walletAddress = wallet.publicKey.toString()
        console.log("my pub wallet ===>",walletAddress);
    }


    function getBuy() {
        buy({ auctionHouse: auctionHouseAddress, buyPrice: price, tokenSize: '1', mint: mintAddress, env: 'devnet', keypair: Keypair.generate().secretKey }).then(x => {
            alert('Buy / offer Action'+'Offer: '+x);
        })
    }
    
    return (
        <div>
            <div><br/>
                <label>Auction House Address:
                    <input type="text" value={auctionHouseAddress} onInput={e => setAuctionHouseAddress((e.target as HTMLTextAreaElement).value)}/>
                </label>
                <label>Mint address:
                    <input type="text" value={mintAddress} onInput={e => setMintAddress((e.target as HTMLTextAreaElement).value)} />
                </label>
                <label>Price:
                    <input type="number" value={price} onInput={e => setPrice((e.target as HTMLTextAreaElement).value)}/>
                </label>
                
            </div>
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={getBuy} disabled={false}
            >
                <div className="hidden group-disabled:block ">
                    Wallet not connected
                </div>
                <span className="block group-disabled:hidden" >
                   Buy
                </span>
            </button>
        </div>
    );
};
