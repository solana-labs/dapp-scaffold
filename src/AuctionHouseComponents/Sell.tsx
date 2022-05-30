import { useWallet } from '@solana/wallet-adapter-react';
import { FC, useCallback, useState } from 'react';

import { sell } from "../api/src/auction-house";

export const Sell: FC = () => {
    let walletAddress = "";
    
    const [price, setPrice] = useState(''); // '' is the initial state value
    const [mintAddress, setMintAddress] = useState(''); // '' is the initial state value
    const [auctionHouseAddress,setAuctionHouseAddress]= useState(''); // '' is the initial state value
    
    const wallet = useWallet();
    if (wallet.connected && wallet.publicKey) {
        walletAddress = wallet.publicKey.toString()
        console.log("my pub wallet ===>",walletAddress);
    }


    function getSell() {
        console.log("ah,auction",auctionHouseAddress);
        
        sell({ auctionHouse: "4kAkuX3eqqb6dFnpbBtbAi9g3tswyAEyns8kDE4nYuvo", buyPrice: price, mint: mintAddress, tokenSize: '1', env: 'devnet', wallet: wallet }).then(x => {
            alert('Create Sell Action'+'Account'+x.account+'MintAddress'+x.mintAddress+'Price'+x.price);
        })
    }
    
    return (
        <div>
            <div><br/>
                <label>Auction House Address:
                    <input className="black-font" type="text" value={auctionHouseAddress} onInput={e => setAuctionHouseAddress((e.target as HTMLTextAreaElement).value)}/>
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
                onClick={getSell} disabled={false}
            >
                <div className="hidden group-disabled:block ">
                    Wallet not connected
                </div>
                <span className="block group-disabled:hidden" >
                   Sell
                </span>
            </button>
        </div>
    );
};
