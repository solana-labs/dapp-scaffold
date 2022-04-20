import { NextPage } from "next";
import Head from "next/head";
import { BasicsView } from "../views";
import { useEffect, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { notify } from "../utils/notifications";
import {
  Keypair,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  SystemProgram,
  TransactionInstruction,
  Transaction,
  // sendTransaction,
  // signAndSendTransaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import {
  establishConnection,
  establishPayer,
  checkProgram,
  sayHello,
  reportGreetings,
} from '../utils/helloworld';
const Basics = (props) => {
  const { publicKey,wallet, sendTransaction } = useWallet();
  const { connection } = useConnection();


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

  const sayHelloButton = async () => {
    notify({ type: 'success', message: 'Saying Hello' });

    // await sayHello(publicKey);

  // const transaction = new Transaction().add(
  //     SystemProgram.transfer({
  //         fromPubkey: publicKey,
  //         toPubkey: Keypair.generate().publicKey,
  //         lamports: 1,
  //     })
  // );
  // signature = await sendTransaction(transaction, connection);

  // await connection.confirmTransaction(signature, 'confirmed');
  let signature;

try {

  const programId = new PublicKey('YPWSCenv6uhXHKE74pCA3RzqJgx2QJJBsnPSeb9BHNp')
  const GREETING_SEED = 'hello';
  let payerPublicKey = new PublicKey('3iGdRcLLJ1iuUf7MRAFMA6mCAhiWjarST8qhZWG5D3Bn')
  const greetedPubkey = await PublicKey.createWithSeed(
    payerPublicKey, //payer.publicKey,
    GREETING_SEED,
    programId,
  );
  console.log('have greeted')
  const tempTokenAccount =new Keypair({publicKey: payerPublicKey.toBytes()});

  const instruction = new TransactionInstruction({
    keys: [{pubkey: greetedPubkey, isSigner: false, isWritable: true}],
    programId,
    data: Buffer.alloc(0), // All instructions are hellos
  });
  const transaction = new Transaction().add(instruction)
  const { blockhash } = await connection.getRecentBlockhash()
  transaction.recentBlockhash = blockhash
  transaction.feePayer = payerPublicKey
  let signedTransaction = await wallet.adapter.signTransaction(transaction)
  const txid = await connection.sendRawTransaction(
    signedTransaction.serialize()
  )
  // let blockhashObj = await connection.getRecentBlockhash();
  // transaction.recentBlockhash = await blockhashObj.blockhash
  // const kk = new Keypair()
  // await sendAndConfirmTransaction(connection, transaction, [greetedPubkey])

  // // const transaction = new Transaction();
  // const { signature } = await wallet.adapter.sendTransaction(transaction); //, {signers: [tempTokenAccount]})
  // // const { signature } = await window.solana.signAndSendTransaction(transaction);
  // await connection.confirmTransaction(signature);

  // const network = "<NETWORK_URL>";
  // const connection = new Connection(network);
  // const transaction = new Transaction();
  // let blockhash = await connection.getLatestBlockhash('finalized').blockhash;
  // transaction.recentBlockhash = blockhash;
  // const signedTransaction = await wallet.adapter.signTransaction(transaction);

  // const signature = await connection.sendRawTransaction(signedTransaction.serialize());
  // await sendAndConfirmTransaction(
  //   connection,
  //   transaction,
  //   [Keypair.generate()],
  // );
  // const tempTokenAccount = Keypair.generate();
  // await wallet.signAndSendTransaction(transaction, {signers: [tempTokenAccount]})

  // signature = await sendTransaction(transaction, connection);
  // await connection.confirmTransaction(signature, 'confirmed');
} catch (error) {
  console.log(JSON.stringify(error))
  notify({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature });
  console.log('error', `Transaction failed! ${error?.message}`, signature);
  return;
}

  // const payerPerson = new Keypair({publicKey: pub})
  // console.log('have instruction')
  // await sendAndConfirmTransaction(
  //   connection,
  //   ,
  //   [payerPerson],
  // );

  // signature = await sendTransaction(transaction, connection);

  // await connection.confirmTransaction(signature, 'confirmed');
  //   notify({ type: 'success', message: 'Said Hello' });
    const greetingReport = await reportGreetings();
    notify({ type: 'success', message: greetingReport });

  }
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
      <button onClick={sayHelloButton}>Say Hello</button>

    </div>
  );
};

export default Basics;
