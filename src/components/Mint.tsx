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
import { useRouter } from 'next/router';
import axios from 'axios';

import Button from 'components/Button';

const Tx = ({ setShowMint }) => {
    const wallet = useWallet();
    const [isMinting, setIsMinting] = useState(false);
    const [candyMachine, setCandyMachine] = useState(null);
    const [candyGuard, setCandyGuard] = useState(null);
    const [canMint, setCanMint] = useState(false);
    const [hasSagaPass, setHasSagaPass] = useState(false);
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
      setCanMint(
        candyMachine &&
        wallet.publicKey &&
        parseInt(candyMachine?.itemsRedeemed || 0) < candyMachine?.items?.length
      );
    }, [candyMachine, wallet?.publicKey])

    useEffect(() => {
      if (canMint) {
        mint();
      }
    }, [canMint])

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
          const mainWalletSigner = publicKey(process.env.NEXT_PUBLIC_MAIN_WALLET);
          const nftMint = generateSigner(umi)
          await transactionBuilder()
            .add(setComputeUnitLimit(umi, { units: 800_000 }))
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
          const mainWalletSigner = publicKey(process.env.NEXT_PUBLIC_MAIN_WALLET);
          const nftMint = generateSigner(umi)
          await transactionBuilder()
            .add(setComputeUnitLimit(umi, { units: 800_000 }))
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
                  nftGate: some({ mint: publicKey(sagaNFT) }),
                  mintLimit: some({ id: 3 })
                }
              })
            )
            .sendAndConfirm(umi, {
              confirm: { commitment: "confirmed" },
            });
            router.push(`/success${router?.query?.redirect ? `?redirect=${router.query.redirect}` : ''}`)
        } catch (e) {
          console.log(e)
          setShowMint(false);
        }
        setIsMinting(false);
      }

    return isMinting ? (
      <>
        <h2 className='text-center text-2xl font-semibold tracking-tight'>Minting in progress</h2>
        <div className="h-[100px] w-full flex items-center justify-center">
            <div className="loading loading-spinner loading-lg text-accent"></div>
        </div>
        {hasSagaPass && (
          <h4 className='text-center text-xl tracking-tight text-primary'>
            Hello Saga phone holder, we gave you a discount
          </h4>
        )}
      </>
    ) : (
      <div className='max-w-md w-full'>
        <Button
          disabled={!canMint}
          onClick={mint}
        >
          Mint my Founders Pass
        </Button>
      </div>
    )
}

export default Tx;