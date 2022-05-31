import type { NextPage } from "next";
import Head from "next/head";
import  { ExecuteView } from "../views";
 
const Basics: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Execute Sale</title>
        <meta
          name="description"
          content="Basic Functionality"
        />
      </Head>
    
      <ExecuteView />
    </div>
  );
};

export default Basics;