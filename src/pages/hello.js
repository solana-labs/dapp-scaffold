import { NextPage } from "next";
import Head from "next/head";
import { BasicsView } from "../views";
import { useEffect, useState } from 'react'
import { notify } from "../utils/notifications";

import {
  establishConnection,
  establishPayer,
  checkProgram,
  sayHello,
  reportGreetings,
} from '../utils/helloworld';
const Basics = (props) => {

  useEffect(async () => {
    notify({ type: 'success', message: 'Starting' });

    await establishConnection();
    notify({ type: 'success', message: 'Connection Established' });

  //   // Determine who pays for the fees
  // //   await establishPayer();
  
  //   // Check if the program has been deployed
    await checkProgram();
    notify({ type: 'success', message: 'Checked Program' });
  
  //   // Say hello to an account
  // //   await sayHello();
  
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
      <BasicsView />
    </div>
  );
};

export default Basics;
