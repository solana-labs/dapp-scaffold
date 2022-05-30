import { useWallet } from '@solana/wallet-adapter-react';
import { FC, useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { execute_sale } from "../api/src/auction-house";

export const ExecuteSell: FC = () => {
    let walletAddress = "";
    
    const [price, setPrice] = useState(''); // '' is the initial state value
    const [mintAddress, setMintAddress] = useState(''); // '' is the initial state value
    const [auctionHouseAddress,setAuctionHouseAddress]= useState(''); // '' is the initial state value
    const [buyerAccount, setBuyerAccount] = useState(''); // '' is the initial state value
    const [sellerAccount, setSellerAccount] = useState(''); // '' is the initial
    
    const wallet = useWallet();
    if (wallet.connected && wallet.publicKey) {
        walletAddress = wallet.publicKey.toString()
        console.log("my pub wallet ===>",walletAddress);
    }


    function getExecuteSale() {
        alert('Execute Sale');
        execute_sale({ auctionHouse: auctionHouseAddress, buyPrice: price, mint: mintAddress, tokenSize: '1', buyerWallet: buyerAccount, sellerWallet: sellerAccount, env: 'devnet', wallet: wallet })
    }
    
    return (
        <div>
            {/* <div><br/>
                <label>Auction House Address:
                    <input type="text" value={auctionHouseAddress} onInput={e => setAuctionHouseAddress((e.target as HTMLTextAreaElement).value)}/>
                </label>
                <label>Mint address:
                    <input type="text" value={mintAddress} onInput={e => setMintAddress((e.target as HTMLTextAreaElement).value)} />
                </label>
                <label>CurrentPrice:
                    <input type="number" value={price} onInput={e => setPrice((e.target as HTMLTextAreaElement).value)}/>
                </label>
                <label>Buyer Account:
                    <input type="text" value={buyerAccount} onInput={e => setBuyerAccount((e.target as HTMLTextAreaElement).value)}/>
                </label>
                <label>Seller Account:
                    <input type="text" value={sellerAccount} onInput={e => setSellerAccount((e.target as HTMLTextAreaElement).value)}/>
                </label>
                
            </div> */}
            <Box
                component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '15ch' },
        input:{
            background: "white"
        }
      }}
      noValidate
      autoComplete="off"
    >
            <TextField 
                label="Auction House Address"
                variant='filled'
                color='success'
                text-color="red"
                size='small'
                onChange={(e) => { setAuctionHouseAddress(e.target.value)}}
            />
                        <TextField 
                label="Mint Address"
                variant='filled'
                color='success'
                text-color="red"
                size='small'
                onChange={(e) => { setMintAddress(e.target.value)}}
            />
            <TextField 
                label="Price"
                variant='filled'
                color='success'
                text-color="red"
                onChange={(e) => { setPrice(e.target.value)}}
                size='small'
            />
            <TextField 
                label="Buyer Account"
                variant='filled'
                color='success'
                text-color="red"
                size='small'
                onChange={(e) => { setBuyerAccount(e.target.value)}}
            />
            <TextField 
                label="Seller Account"
                variant='filled'
                color='success'
                text-color="red"
                onChange={(e) => { setSellerAccount(e.target.value)}}
                size='small'
            />
    </Box>
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={getExecuteSale} disabled={false}
            >
                <div className="hidden group-disabled:block ">
                    Wallet not connected
                </div>
                <span className="block group-disabled:hidden" >
                   Execute Sell
                </span>
            </button>
        </div>
    );
};