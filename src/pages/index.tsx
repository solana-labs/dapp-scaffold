import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";
// import Torus from "@toruslabs/solana-embed";
import { useEffect } from "react";

const Home: NextPage = (props) => {
  useEffect(()=>{
    const init = async () => {
        const Torus = (await import("@toruslabs/solana-embed")).default
        console.log(Torus)
        let torus = new Torus({})
        await torus.init()
        
        await torus.login()
    }
    init();
  },[])
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta
          name="description"
          content="Solana Scaffold"
        />
      </Head>    

      <HomeView />
    </div>
  );
};

export default Home;
