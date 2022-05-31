import { Sell } from "AuctionHouseComponents/Sell";
import type { NextPage } from "next";
import Head from "next/head";
import  {SellView} from "../views";

const Basics: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>SoluLab - Solana</title>
        <meta
          name="description"
          content="Basic Functionality"
        />
      </Head>
    
      <SellView />
    </div>
  );
};

export default Basics;