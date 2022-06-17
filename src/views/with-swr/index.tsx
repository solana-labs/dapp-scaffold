import { FC } from 'react';
import { TransactionForm } from 'components/TransactionForm';
import { TransactionTable } from 'components/TransactionTable';
import { useBalance } from 'hooks/useBalance';
import { useWallet } from '@solana/wallet-adapter-react';

export const WithSWRView: FC = () => {
  const { publicKey } = useWallet();
  const { balance, isError } = useBalance();

  const renderBalance = () =>
    isError ? (
      <div>Error</div>
    ) : (
      <p className="text-lg">
        <span className="font-bold">Balance:</span> {balance || 0} SOL
      </p>
    );

  return (
    <div className="flex h-full w-full flex-col items-center p-8">
      <h1 className="bg-gradient-to-tr from-[#9945FF] to-[#14F195] bg-clip-text text-center text-5xl font-bold text-transparent">
        Solana + SWR
      </h1>
      <div className="flex w-full grow flex-col gap-4 py-4 md:px-24 lg:px-16 xl:px-24">
        <p className="my-2 text-center text-slate-300 md:w-full">
          Example showing how the{' '}
          <a
            className="link text-blue-500 hover:text-blue-700"
            href="https://swr.vercel.app/"
          >
            SWR
          </a>{' '}
          data fetching library can be leveraged{' '}
          <br className="hidden md:block" />
          for asynchronous Solana calls.
        </p>
        {!publicKey ? (
          <p className="my-2 text-center text-slate-500 md:w-full">
            Connect your wallet to continue.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-12 py-8 lg:grid-cols-2">
            <div className="flex flex-1 flex-col gap-4">
              {renderBalance()}
              <TransactionForm />
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <p className="text-lg font-bold">Latest transactions</p>
              <TransactionTable />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
