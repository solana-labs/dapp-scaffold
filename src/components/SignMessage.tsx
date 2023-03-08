// TODO: SignMessage
import { verify } from '@noble/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { useCallback } from 'react';
import { notify } from '../utils/notifications';

export const SignMessage = () => {
  const { publicKey, signMessage } = useWallet();

  const onClick = useCallback(async () => {
    try {
      // `publicKey` will be null if the wallet isn't connected
      if (!publicKey) throw new Error('Wallet not connected!');
      // `signMessage` will be undefined if the wallet doesn't support it
      if (!signMessage)
        throw new Error('Wallet does not support message signing!');
      // Encode anything as bytes
      const message = new TextEncoder().encode('Hello, world!');
      // Sign the bytes using the wallet
      const signature = await signMessage(message);
      // Verify that the bytes were signed using the private key that matches the known public key
      if (!verify(signature, message, publicKey.toBytes()))
        throw new Error('Invalid signature!');
      notify({
        type: 'success',
        message: 'Sign message successful!',
        txid: bs58.encode(signature),
      });
    } catch (error: any) {
      notify({
        type: 'error',
        message: 'Sign Message failed!',
        description: error?.message,
      });
      console.log('error', `Sign Message failed! ${error?.message}`);
    }
  }, [publicKey, signMessage]);

  return (
    <div className='flex flex-row justify-center'>
      <div className='group relative items-center'>
        <div
          className='animate-tilt absolute -inset-0.5 m-1 rounded-lg bg-gradient-to-r
                from-indigo-500 to-fuchsia-500 opacity-20 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200'
        />
        <button
          className='group btn m-2 w-60 animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-black hover:from-white hover:to-purple-300'
          onClick={onClick}
          disabled={!publicKey}
        >
          <div className='hidden group-disabled:block'>
            Wallet not connected
          </div>
          <span className='block group-disabled:hidden'>Sign Message</span>
        </button>
      </div>
    </div>
  );
};
