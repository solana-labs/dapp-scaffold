/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
    Keypair,
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
    SystemProgram,
    TransactionInstruction,
    Transaction,
    sendAndConfirmTransaction,
  } from '@solana/web3.js';
//   import fs from 'fs';
//   import path from 'path';
  import * as borsh from 'borsh';
  
  import {getPayer, getRpcUrl, createKeypairFromFile} from './util';
  
  /**
   * Connection to the network
   */
  let connection: Connection;
  
  /**
   * Keypair associated to the fees' payer
   */
  let payer: Keypair;
  
  /**
   * Hello world's program id
   */
  let programId: PublicKey;
  
  /**
   * The public key of the account we are saying hello to
   */
  let greetedPubkey: PublicKey;
  
  /**
   * Path to program files
   */
//   const PROGRAM_PATH = path.resolve(__dirname, '../../dist/program');
  
//   /**
//    * Path to program shared object file which should be deployed on chain.
//    * This file is created when running either:
//    *   - `npm run build:program-c`
//    *   - `npm run build:program-rust`
//    */
//   const PROGRAM_SO_PATH = path.join(PROGRAM_PATH, 'helloworld.so');
  
//   /**
//    * Path to the keypair of the deployed program.
//    * This file is created when running `solana program deploy dist/program/helloworld.so`
//    */
//   const PROGRAM_KEYPAIR_PATH = path.join(PROGRAM_PATH, 'helloworld-keypair.json');
  
  /**
   * The state of a greeting account managed by the hello world program
   */
  class GreetingAccount {
    counter = 0;
    constructor(fields: {counter: number} | undefined = undefined) {
      if (fields) {
        this.counter = fields.counter;
      }
    }
  }
  
  /**
   * Borsh schema definition for greeting accounts
   */
  const GreetingSchema = new Map([
    [GreetingAccount, {kind: 'struct', fields: [['counter', 'u32']]}],
  ]);
  
  /**
   * The expected size of each greeting account.
   */
  const GREETING_SIZE = borsh.serialize(
    GreetingSchema,
    new GreetingAccount(),
  ).length;
  
  /**
   * Establish a connection to the cluster
   */
  export async function establishConnection(): Promise<void> {
    const rpcUrl = await getRpcUrl();
    connection = new Connection(rpcUrl, 'confirmed');
    const version = await connection.getVersion();
    console.log('Connection to cluster established:', rpcUrl, version);
  }
  
  /**
   * Establish an account to pay for everything
   */
  export async function establishPayer(): Promise<void> {
    let fees = 0;
    if (!payer) {
      const {feeCalculator} = await connection.getRecentBlockhash();
  
      // Calculate the cost to fund the greeter account
      fees += await connection.getMinimumBalanceForRentExemption(GREETING_SIZE);
  
      // Calculate the cost of sending transactions
      fees += feeCalculator.lamportsPerSignature * 100; // wag
  
      payer = await getPayer();
    }
  
    let lamports = await connection.getBalance(payer.publicKey);
    if (lamports < fees) {
      // If current balance is not enough to pay for fees, request an airdrop
      const sig = await connection.requestAirdrop(
        payer.publicKey,
        fees - lamports,
      );
      await connection.confirmTransaction(sig);
      lamports = await connection.getBalance(payer.publicKey);
    }
  
    console.log(
      'Using account',
      payer.publicKey.toBase58(),
      'containing',
      lamports / LAMPORTS_PER_SOL,
      'SOL to pay for fees',
    );
  }
  
  /**
   * Check if the hello world BPF program has been deployed
   */
  export async function checkProgram(): Promise<void> {
    // // Read program id from keypair file
    // try {
    //   const programKeypair = await createKeypairFromFile(PROGRAM_KEYPAIR_PATH);
    //   programId = programKeypair.publicKey;
    // } catch (err) {
    //   const errMsg = (err as Error).message;
    //   throw new Error(
    //     `Failed to read program keypair at '${PROGRAM_KEYPAIR_PATH}' due to error: ${errMsg}. Program may need to be deployed with \`solana program deploy dist/program/helloworld.so\``,
    //   );
    // }

    programId = new PublicKey('YPWSCenv6uhXHKE74pCA3RzqJgx2QJJBsnPSeb9BHNp')
  
    // Check if the program has been deployed
    const programInfo = await connection.getAccountInfo(programId);
    // if (programInfo === null) {
    //   if (fs.existsSync(PROGRAM_SO_PATH)) {
    //     throw new Error(
    //       'Program needs to be deployed with `solana program deploy dist/program/helloworld.so`',
    //     );
    //   } else {
    //     throw new Error('Program needs to be built and deployed');
    //   }
    // } else if (!programInfo.executable) {
    //   throw new Error(`Program is not executable`);
    // }
    console.log(`Using program ${programId.toBase58()}`);
  
    // Derive the address (public key) of a greeting account from the program so that it's easy to find later.
    const GREETING_SEED = 'hello';
    let payerPublicKey = new PublicKey('3iGdRcLLJ1iuUf7MRAFMA6mCAhiWjarST8qhZWG5D3Bn')
    greetedPubkey = await PublicKey.createWithSeed(
      payerPublicKey, //payer.publicKey,
      GREETING_SEED,
      programId,
    );
  
    // Check if the greeting account has already been created
    const greetedAccount = await connection.getAccountInfo(greetedPubkey);
    if (greetedAccount === null) {
      console.log(
        'Creating account',
        greetedPubkey.toBase58(),
        'to say hello to',
      );
      const lamports = await connection.getMinimumBalanceForRentExemption(
        GREETING_SIZE,
      );
  
      const transaction = new Transaction().add(
        SystemProgram.createAccountWithSeed({
          fromPubkey: payer.publicKey,
          basePubkey: payer.publicKey,
          seed: GREETING_SEED,
          newAccountPubkey: greetedPubkey,
          lamports,
          space: GREETING_SIZE,
          programId,
        }),
      );
      await sendAndConfirmTransaction(connection, transaction, [payer]);
    }
  }
  
  /**
   * Say hello
   */
  export async function sayHello(pub): Promise<void> {
    programId = new PublicKey('YPWSCenv6uhXHKE74pCA3RzqJgx2QJJBsnPSeb9BHNp')
    const GREETING_SEED = 'hello';
    let payerPublicKey = new PublicKey('3iGdRcLLJ1iuUf7MRAFMA6mCAhiWjarST8qhZWG5D3Bn')
    greetedPubkey = await PublicKey.createWithSeed(
      payerPublicKey, //payer.publicKey,
      GREETING_SEED,
      programId,
    );
    console.log('have greeted')
    const instruction = new TransactionInstruction({
      keys: [{pubkey: greetedPubkey, isSigner: false, isWritable: true}],
      programId,
      data: Buffer.alloc(0), // All instructions are hellos
    });
    const payerPerson = new Keypair({publicKey: pub})
    console.log('have instruction')
    await sendAndConfirmTransaction(
      connection,
      new Transaction().add(instruction),
      [payerPerson],
    );
  }
  
  /**
   * Report the number of times the greeted account has been said hello to
   */
  export async function reportGreetings(): Promise<string> {
    const accountInfo = await connection.getAccountInfo(greetedPubkey);
    if (accountInfo === null) {
      throw 'Error: cannot find the greeted account';
    }
    console.log('test')
    const greeting = borsh.deserialize(
      GreetingSchema,
      GreetingAccount,
      accountInfo.data,
    );
    console.log('test')
    return `${greetedPubkey.toBase58()} has been greeted ${greeting.counter} time(s).`
    // console.log(
    //   greetedPubkey.toBase58(),
    //   'has been greeted',
    //   greeting.counter,
    //   'time(s)',
    // );
    // console.log('test')
  
  }
  