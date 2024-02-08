// Next, React
import { FC, useEffect } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';

import Button from 'components/Button';

export const SuccessView: FC = ({ }) => {

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.75 }
    });
  }, [])

  return (

    <div className="">
      <Image src="/illustration-pass.svg" alt="" width="600" height="400"/>
      <div className='text-center'>
        <h1 className='my-4 text-2xl font-semibold'>Welcome to the club!</h1>
        <p className='text-primary my-4'>Your founders pass has been stored safely in your wallet. Look after it, it is the key to an exciting future.</p>
      </div>
      <Button href="https://talk.xyz" className='mt-4'>Continue</Button>
    </div>
  );
};
