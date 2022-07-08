import type { NextPage } from "next";
import Head from "next/head";
import { HogeView } from "../views";

const Hoge: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta
          name="description"
          content="Basic Functionality"
        />
      </Head>
      <HogeView />
    </div>
  );
};

export default Hoge;
