import React, { useEffect, useState } from 'react';

import {
  generateSigner,
  publicKey,
  some,
  transactionBuilder
} from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import {
  mplCandyMachine,
  fetchCandyMachine,
  fetchCandyGuard,
  mintV2
} from '@metaplex-foundation/mpl-candy-machine';
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox';
import { useWallet } from "@solana/wallet-adapter-react";

const Tx = () => {
    const wallet = useWallet();
    const [isMinting, setIsMinting] = useState(false);
    const [candyMachine, setCandyMachine] = useState(null);
    const [candyGuard, setCandyGuard] = useState(null);
    

    const umi = createUmi(process.env.NEXT_PUBLIC_MAINNET_ENDPOINT)
        .use(walletAdapterIdentity(wallet))
        .use(mplCandyMachine())

    const fetchCandyMachineAndGuard = async () => {
      const candyMachinePublicKey = publicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_KEY)
      const candyMachine = await fetchCandyMachine(umi, candyMachinePublicKey);
      const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);
      console.log(candyMachine, candyGuard);
      setCandyMachine(candyMachine);
      setCandyGuard(candyGuard);
    }

    useEffect(() => {
      fetchCandyMachineAndGuard()
    }, [])

    const mintOne = async () => {
        setIsMinting(true);
        const nftMint = generateSigner(umi)
        await transactionBuilder()
          .add(setComputeUnitLimit(umi, { units: 800_000 }))
          .add(
            mintV2(umi, {
              candyMachine: candyMachine.publicKey,
              nftMint,
              collectionMint: candyMachine.collectionMint,
              collectionUpdateAuthority: candyMachine.authority,
              tokenStandard: candyMachine.tokenStandard,
              mintArgs: {
                allocation: some({ id: 1 })
              }
            })
          )
          .sendAndConfirm(umi)
        setIsMinting(false);
    
        // Fetch the candy machine to update the counts
        await fetchCandyMachineAndGuard()
      }
    
      const canMint =
        candyMachine &&
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