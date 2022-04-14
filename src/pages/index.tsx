import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>SolGats - Ask The Oracle</title>
        <meta
          name="Peer into the future of SolGats journey with the all seeing eye of The Oracle."
          content="SolGats - Ask The Oracle"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
