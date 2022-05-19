import type { NextPage } from "next";
import Head from "next/head";
import { SnapshotsView } from "../views";

const Snapshots: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta
          name="description"
          content="Overview Functionality"
        />
      </Head>
      <SnapshotsView />
    </div>
  );
};

export default Snapshots;
