import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import Notifications from '../components/Notification';
import Rainbow from '../components/Rainbow';
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
          <Head>
            <title>Talk.xyz</title>
          </Head>
          <ContextProvider>
            <div className="flex flex-col h-screen">
              <Rainbow />
              <div className="flex-1 flex flex-col max-w-xl m-auto p-4">
                <Notifications />
                <AppBar/>
                <Component {...pageProps} />
              </div>
              <Rainbow />
            </div>
          </ContextProvider>
        </>
    );
};

export default App;
