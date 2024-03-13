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
import { setComputeUnitLimit, setComputeUnitPrice } from '@metaplex-foundation/mpl-toolbox';
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { useRouter } from 'next/router';
import { Connection } from "@solana/web3.js"
import axios from 'axios';

import Button from 'components/Button';

const Tx = ({ setShowMint }) => {
    const wallet = useWallet();
    const [isMinting, setIsMinting] = useState(false);
    const [candyMachine, setCandyMachine] = useState(null);
    const [candyGuard, setCandyGuard] = useState(null);
    const [canMint, setCanMint] = useState(false);
    const [hasSagaPass, setHasSagaPass] = useState(false);
    const [balance, setBalance] = useState(0);
    const router = useRouter();

    const umi = createUmi(process.env.NEXT_PUBLIC_MAINNET_ENDPOINT)
        .use(walletAdapterIdentity(wallet))
        .use(mplCandyMachine())

    const fetchCandyMachineAndGuard = async () => {
      const candyMachinePublicKey = publicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_KEY);
      const candyMachine = await fetchCandyMachine(umi, candyMachinePublicKey);
      const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);
      setCandyMachine(candyMachine);
      setCandyGuard(candyGuard);
    }

    useEffect(() => {
      fetchCandyMachineAndGuard()
    }, [])

    useEffect(() => {
      if (wallet.publicKey) {
        getBalance();
      }
    }, [wallet.publicKey])

    const getBalance = async () => {
      const balance = await umi.rpc.getBalance(publicKey(wallet.publicKey));
      setBalance(Number(balance.basisPoints) / 1000000000)

    }

    useEffect(() => {
      setCanMint(
        candyMachine &&
        wallet.publicKey &&
        parseInt(candyMachine?.itemsRedeemed || 0) < candyMachine?.items?.length
      );
    }, [candyMachine, wallet?.publicKey])

    const mint = async () => {
      try {
        const result = await axios.post('https://lancelot.talk.xyz/user/wallet_has_saga_pass', {
          wallet_address: wallet.publicKey
        });
        const sagaNFT = result?.data?.has_saga_pass;
        if (sagaNFT) {
          setHasSagaPass(true);
          mintSaga(sagaNFT);
        } else {
          mintPublic();
        }
      } catch (e) {
        console.log(e)
      }
    }

    const mintPublic = async () => {
        setIsMinting(true);
        try {
          const fees = await getFees();
          const mainWalletSigner = publicKey(process.env.NEXT_PUBLIC_MAIN_WALLET);
          const nftMint = generateSigner(umi)
          await transactionBuilder()
            .add(setComputeUnitPrice(umi, { microLamports: Math.max(fees, 4000) }))
            .add(setComputeUnitLimit(umi, { units: 1_000_000 }))
            .add(
              mintV2(umi, {
                candyMachine: candyMachine.publicKey,
                candyGuard: candyGuard.publicKey,
                nftMint,
                collectionMint: candyMachine.collectionMint,
                collectionUpdateAuthority: candyMachine.authority,
                tokenStandard: candyMachine.tokenStandard,
                group: some('public'),
                mintArgs: {
                  solPayment: some({ destination: mainWalletSigner }),
                  mintLimit: some({ id: 2 })
                }
              })
            )
            .sendAndConfirm(umi, {
              send: { maxRetries: 5 },
              confirm: { commitment: "confirmed" },
            });
            router.push(`/success${router?.query?.redirect ? `?redirect=${router.query.redirect}` : ''}`)
        } catch (e) {
          console.log(e)
          setShowMint(false);
        }
        setIsMinting(false);
      }

      const mintSaga = async (sagaNFT) => {
        setIsMinting(true);
        try {
          const fees = await getFees();
          const mainWalletSigner = publicKey(process.env.NEXT_PUBLIC_MAIN_WALLET);
          const nftMint = generateSigner(umi)
          await transactionBuilder()
            .add(setComputeUnitPrice(umi, { microLamports: Math.max(fees, 4000) }))
            .add(setComputeUnitLimit(umi, { units: 1_000_000 }))
            .add(
              mintV2(umi, {
                candyMachine: candyMachine.publicKey,
                candyGuard: candyGuard.publicKey,
                nftMint,
                collectionMint: candyMachine.collectionMint,
                collectionUpdateAuthority: candyMachine.authority,
                tokenStandard: candyMachine.tokenStandard,
                group: some('saga'),
                mintArgs: {
                  solPayment: some({ destination: mainWalletSigner }),
                  nftGate: some({ mint: publicKey(sagaNFT) }),
                  mintLimit: some({ id: 3 })
                }
              })
            )
            .sendAndConfirm(umi, {
              send: { maxRetries: 5 },
              confirm: { commitment: "confirmed" },
            });
            router.push(`/success${router?.query?.redirect ? `?redirect=${router.query.redirect}` : ''}`)
        } catch (e) {
          console.log(e)
          setShowMint(false);
        }
        setIsMinting(false);
      }

    const getFees = async () => {
      const rpcConnection = new Connection(process.env.NEXT_PUBLIC_MAINNET_ENDPOINT)

      const latestPriorityFees = await rpcConnection.getRecentPrioritizationFees()
      let highestPriorityFee = 0
      let maxPriorityFee = 5000
      for (const feeObj of latestPriorityFees) {
          if (feeObj.prioritizationFee > highestPriorityFee) {
              highestPriorityFee = feeObj.prioritizationFee
          }
      }
      if (highestPriorityFee > maxPriorityFee) {
          highestPriorityFee = maxPriorityFee
      }

      return highestPriorityFee;
    }

    return isMinting ? (
      <>
        <WalletMultiButton />
        <h2 className='text-center text-2xl font-semibold tracking-tight mt-4'>Minting in progress</h2>
        <div className="h-[100px] w-full flex items-center justify-center">
            <div className="loading loading-spinner loading-lg text-accent"></div>
        </div>
        {hasSagaPass && balance < 2 ? (
          <h4 className='text-center text-xl tracking-tight text-error'>
            Are you short on funds? You&apos;ll need at least 2 SOL. It looks like you only have {balance.toFixed(2)}
          </h4>
        ) : hasSagaPass ? (
          <h4 className='text-center text-xl tracking-tight text-primary'>
            Hello Saga phone holder, we gave you a discount!
          </h4>
        ) : balance < 3 ? (
          <h4 className='text-center text-xl tracking-tight text-error'>
            Are you short on funds? You&apos;ll need at least 3 SOL. It looks like you only have {balance.toFixed(2)}
          </h4>
        ) : null}
      </>
    ) : (
      <div className='max-w-md w-full px-4'>
        <div className='flex justify-center'>
          <WalletMultiButton />
        </div>
        <Button
          disabled={!canMint}
          onClick={mint}
          className='mt-4'
        >
          Mint my Founders Pass
        </Button>
      </div>
    )
}

export default Tx;