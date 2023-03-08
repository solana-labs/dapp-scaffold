import { SignMessage } from '../../components/SignMessage';
import { SendTransaction } from '../../components/SendTransaction';
import { SendVersionedTransaction } from '../../components/SendVersionedTransaction';

export const BasicsView = () => (
  <div className='mx-auto p-4 md:hero'>
    <div className='flex flex-col md:hero-content'>
      <h1 className='mt-10 mb-8 bg-gradient-to-br from-indigo-500 to-fuchsia-500 bg-clip-text text-center text-5xl font-bold text-transparent'>
        Basics
      </h1>
      {/* CONTENT GOES HERE */}
      <div className='text-center'>
        <SignMessage />
        <SendTransaction />
        <SendVersionedTransaction />
      </div>
    </div>
  </div>
);
