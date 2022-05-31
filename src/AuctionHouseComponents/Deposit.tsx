import { useWallet } from '@solana/wallet-adapter-react';
import { FC, useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { deposit } from "../api/src/auction-house";

export const Deposit: FC = () => {
    let walletAddress = "";
    const [price, setPrice] = useState(''); // '' is the initial state value
    const [auctionHouseAddress,setAuctionHouseAddress]= useState(''); // '' is the initial state value
    


    const { publicKey } = useWallet();
    const wallet = useWallet();
    if (wallet.connected && wallet.publicKey) {
        walletAddress = wallet.publicKey.toString()
    }


    function getDeposit() {
        deposit({ auctionHouse: auctionHouseAddress, amount: price, env: 'devnet', wallet: wallet })
    }
    
    return (
        <div>
            

            {/* <label>Auction House Address:
                    <input type="text" value={auctionHouseAddress} onInput={e => setAuctionHouseAddress((e.target as HTMLTextAreaElement).value)}/>
                </label>
                <label>Amount:
                    <input type="number" value={price} onInput={e => setPrice((e.target as HTMLTextAreaElement).value)}/>
                </label> */}
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
                onChange={(e) => { setAuctionHouseAddress(e.target.value)}}
                size='small'
            />
            <TextField 
                label="Deposit Value"
                variant='filled'
                color='success'
                onChange={(e) => { setPrice(e.target.value)}}
                size='small'
            />

    </Box>
    <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={getDeposit} disabled={!publicKey}
            >
                <div className="hidden group-disabled:block ">
                    Wallet not connected
                </div>
                <span className="block group-disabled:hidden" >
                    Deposit 
                </span>
            </button>

        </div>
    );
};
