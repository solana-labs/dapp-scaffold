import { AppProps } from 'next/app';
import Head from 'next/head';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import { Footer } from '../components/Footer';
import Notifications from '../components/Notification';

require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Solana Scaffold Lite</title>
    </Head>

    <ContextProvider>
      <div className='flex h-screen flex-col'>
        <Notifications />
        <AppBar />
        <ContentContainer>
          <Component {...pageProps} />
          <Footer />
        </ContentContainer>
      </div>
    </ContextProvider>
  </>
);

export default App;
