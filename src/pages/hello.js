import { NextPage } from "next";
import Head from "next/head";
import { HelloView } from "../views";
import { useEffect } from 'react'
import { notify } from "../utils/notifications";

import {
  establishConnection,
  checkProgram,
  reportGreetings,
} from '../utils/helloworld';
const Basics = (props) => {
  useEffect(async () => {

    await establishConnection();
    notify({ type: 'success', message: 'Connection Established' });
  
  //   // Check if the program has been deployed
    await checkProgram();
  
  //   // Find out how many times that account has been greeted
    const greetingReport = await reportGreetings();
    notify({ type: 'success', message: greetingReport });

  }, []);
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta
          name="description"
          content="Basic Functionality"
        />
      </Head>
      <HelloView />
    </div>
  );
};

export default Basics;
