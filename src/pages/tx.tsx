import React, { useEffect } from 'react';

import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplCandyMachine, create, fetchCandyMachine, fetchCandyGuard, addConfigLines, mintV2, route, deleteCandyGuard, deleteCandyMachine, updateCandyGuard } from '@metaplex-foundation/mpl-candy-machine'
import { Connection } from "@solana/web3.js"

const Tx = () => {
    // Config
    // main net
    const rpcConnection = new Connection(process.env.NEXT_PUBLIC_MAINNET_ENDPOINT)

    // test net
    // const rpcConnection = new Connection(process.env.NEXT_PUBLIC_TESTNET_ENDPOINT)
    const umi = createUmi(rpcConnection)

    // Umi config
    umi.use(mplCandyMachine());

    const fetchCandyMachineAndGuard = async (candyMachinePublicKey, doLog) => {
        const candyMachine = await fetchCandyMachine(umi, candyMachinePublicKey)
        const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority)
    
        if (doLog) {
            console.log(`Candy machine public key: ${candyMachine.publicKey}`)
            console.log(`Candy machine mint authority: ${candyMachine.mintAuthority}`)
            console.log(`Candy machine items available: ${candyMachine.itemsAvailable}`)
            console.log(`Candy machine items redeemed: ${candyMachine.itemsRedeemed}`)
            console.log(`Candy machine items loaded: ${candyMachine.itemsLoaded}`)
            console.log("Items:")
            console.log(candyMachine.items)
            console.log(`Candy machine authority: ${candyMachine.authority}`)
            console.log(`Candy guard public key: ${candyGuard.publicKey}`)
            for (const group of candyGuard.groups) {
                console.log(`groupLabel: ${group.label}`)
                console.log("addressGate:")
                console.log(group.guards.addressGate)
                console.log("allocation:")
                console.log(group.guards.allocation)
                console.log("solPayment:")
                console.log(group.guards.solPayment)
                console.log("startDate:")
                console.log(group.guards.startDate)
                console.log("nftGate:")
                console.log(group.guards.nftGate)
            }
        }
    
        return { candyMachine, candyGuard }
    }

    useEffect(() => {
        fetchCandyMachineAndGuard(process.env.NEXT_PUBLIC_CANDY_MACHINE_KEY, true);
    }, [])

    return null;
}

export default Tx;