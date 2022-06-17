import Head from 'next/head';
import type { NextPage } from 'next';
import { WithSWRView } from 'views/with-swr';

const WithSWR: NextPage = () => (
  <>
    <Head>
      <title>Solana + SWR</title>
      <meta
        name="description"
        content="Example showing how the SWR data fetching library can be leveraged for asynchronous Solana calls."
      />
    </Head>
    <WithSWRView />
  </>
);

export default WithSWR;
