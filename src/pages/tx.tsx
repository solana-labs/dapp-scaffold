import React, { useEffect, useState } from 'react';

import { CandyMachineV2, Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

const Tx = () => {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [candyMachine, setCandyMachine] = useState<CandyMachineV2 | undefined>(undefined)
    const [isMinting, setIsMinting] = useState(false)

    const metaplex = Metaplex
        .make(connection)
        .use(walletAdapterIdentity(wallet))

    const candyMachines = metaplex.candyMachinesV2()

    async function fetchCandyMachine() {
        const fetched = await candyMachines
        .findByAddress({ address: new PublicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_KEY) })

        console.log("Fetched candy machine!", fetched)
        setCandyMachine(fetched)
    }

    useEffect(() => {
        fetchCandyMachine()
    }, [])

    async function mintOne() {
        setIsMinting(true);
    
        const mintOutput = await candyMachines
          .mint({ candyMachine });
    
        setIsMinting(false);
        console.log("Minted one!", mintOutput)
    
        // Fetch the candy machine to update the counts
        await fetchCandyMachine()
      }
    
      const canMint =
        candyMachine &&
        candyMachine.itemsRemaining.toNumber() > 0 &&
        wallet.publicKey &&
        !isMinting

    return (
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md cursor-pointer hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!canMint}
          onClick={mintOne}
        >
          Mint 1 {candyMachine ? candyMachine.symbol : "NFT"}! <span className={isMinting ? 'animate-spin' : 'animate-none'}>🦖</span>
        </button>
    )
}

export default Tx;