import { useWallet } from '@solana/wallet-adapter-react';
import { FC, useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { buy } from "../api/src/auction-house";
import { PublicKey } from '@solana/web3.js';

export const Buy: FC = () => {
    let walletAddress = "";
    
    const { publicKey } = useWallet();
    const [price, setPrice] = useState(''); // '' is the initial state value
    const [mintAddress, setMintAddress] = useState(''); // '' is the initial state value
    const [auctionHouseAddress,setAuctionHouseAddress]= useState(''); // '' is the initial state value
    
    const wallet = useWallet();
    if (wallet.connected && wallet.publicKey) {
        walletAddress = wallet.publicKey.toString()
    }


    function getBuy() {
        buy({ auctionHouse: auctionHouseAddress, buyPrice: price, tokenSize: '1', mint: mintAddress, env: 'devnet', wallet: wallet }).then(x => {
            alert('Buy / offer Action'+'Offer: '+x);
        })
    }
    
    return (
        <div>
            <Box
                component="form"
      sx={{
        '& > :not(style)': { m: 2, width: '25ch' },
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
                onChange={(e) => { setAuctionHouseAddress(e.target.value)}}
                size='small'
            />
                        <TextField 
                label="Mint Address"
                variant='filled'
                color='success'
                text-color="red"
                onChange={(e) => { setMintAddress(e.target.value)}}
                size='small'
            />
                        <TextField 
                label="Price"
                variant='filled'
                color='success'
                text-color="red"
                onChange={(e) => { setPrice(e.target.value)}}
                size='small'
            />
    </Box>
    <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={getBuy} disabled={!publicKey}
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
