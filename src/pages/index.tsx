import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Mint a Talk Founders Pass · Talk.xyz</title>
        <meta
          name="description"
          content="Secure yourself a limited edition Talk founders pass and access to pro features on Talk.xyz. The tradeable NFT costs 4 SOL."
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
