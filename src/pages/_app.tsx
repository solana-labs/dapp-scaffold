import { AppProps } from 'next/app';
import { Inter } from '@next/font/google';
import Head from 'next/head';
import { FC } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import Notifications from '../components/Notification';
import Rainbow from '../components/Rainbow';
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
          <Head>
            <title>Talk.xyz</title>
          </Head>
          <ContextProvider>
            <div className={`${inter.variable} flex flex-col h-screen font-sans`}>
              <Rainbow />
              <div className="flex-1 flex flex-col max-w-xl m-auto p-4 mb-8">
                <Notifications />
                <Component {...pageProps} />
              </div>
              <Rainbow />
            </div>
          </ContextProvider>
        </>
    );
};

export default App;
