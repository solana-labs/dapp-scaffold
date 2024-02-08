// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import FounderBox from 'components/FounderBox';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';

export const HomeView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()

  useEffect(() => {
    if (wallet.publicKey) {
      getUserSOLBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])

  return (

    <div className="">
      <div className="navbar flex flex-col md:flex-row items-center mb-4">
        <Link href="https://talk.xyz" passHref className="text-base-content-accent">
          <svg
              width="220"
              height="220"
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
              aria-describedby="logo"
              className="w-[130px] h-[130px]"
          >
              <title id="logo">
                  Talk — Chat with your Web3 community across Solana and
                  Ethereum
              </title>
              <path
                  d="m141.9 200.38c-7.481 0-13.545 6.085-13.545 13.59 0 7.506 6.064 13.591 13.545 13.591h52.213c1.812 0 3.283 1.473 3.283 3.295v12.841h-68.157v99.907h77.318c9.894 0 17.915-8.048 17.915-17.975v-59.714h0.014v-35.059c0-16.829-13.595-30.476-30.373-30.476h-52.213zm14.484 70.552h40.943v45.437h-40.943v-45.437z"
                  clipRule="evenodd"
                  fill="currentColor"
                  fillRule="evenodd"
              />
              <path
                  d="m282.44 300.16v-143.2h27.145v39.486l38.61-35.665c5.515-5.093 14.101-4.737 19.178 0.795 5.077 5.533 4.722 14.148-0.792 19.242l-40.263 37.19 21.586 18.738c14.407 12.507 22.687 30.679 22.687 49.794v13.617h-27.145v-13.617c0-11.209-4.855-21.864-13.303-29.198l-20.558-17.846v60.661h-27.145z"
                  clipRule="evenodd"
                  fill="currentColor"
                  fillRule="evenodd"
              />
              <path
                  d="m85.893 139.6c0-14.139 11.424-25.601 25.516-25.601h277.08c14.092 0 25.516 11.462 25.516 25.601v221.58c0 14.139-11.424 25.601-25.516 25.601h-162.05l-98.367 48.193c-19.475 9.542-42.18-4.686-42.18-26.431v-48.558h0.0085v-0.446h27.145v7e-3h273.82v-218.32h-244.87v-3e-3h-56.09v-1.631z"
                  fill="currentColor"
              />
              <path
                  d="m85.893 184.5h-54.321c-7.4958 0-13.572-6.097-13.572-13.617 0-7.521 6.0765-13.618 13.572-13.618h235.98v0.24h0.305l1e-3 158.95h89.591c7.496 0 13.573 6.097 13.573 13.617 0 7.521-6.077 13.618-13.573 13.618h-116.74v-159.19h-127.68v158.7h-27.145v-158.7z"
                  fill="currentColor"
              />
          </svg>
        </Link>
        <h1 className="text-base-content text-center text-balance text-2xl font-semibold md:text-left">Secure yourself a limited edition Talk founders pass.</h1>
      </div>
      <FounderBox />    
      {wallet &&
        <div className="flex flex-row justify-center">
          <div>
            {(balance || 0).toLocaleString()}
            </div>
            <div className='text-slate-600 ml-2'>
              SOL
            </div>
        </div>
      }
    </div>
  );
};
