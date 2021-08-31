import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

export const sendAndConfirmWalletTransaction = async (
  connection: Connection,
  signTransaction: (transaction: Transaction) => Promise<Transaction>,
  {
    feePayer,
    instructions,
  }: { feePayer: PublicKey; instructions: TransactionInstruction[] }
) => {
  const recentBlockhash = await connection.getRecentBlockhash();
  // In order to create a transaction you'll need a recent blockhash
  const transaction = new Transaction({
    recentBlockhash: recentBlockhash.blockhash,
    feePayer,
  }).add(...instructions);
  // Transactions can be signed by the wallet, this method comes from useWallet();
  const signedTransaction = await signTransaction(transaction);
  
  // The sendRawTransaction method is good for sending signed transactions.
  const transactionId = await connection.sendRawTransaction(
    signedTransaction.serialize()
  );

  // At last, we confirm the transaction before continuing.
  await connection.confirmTransaction(transactionId, "confirmed");
  return transactionId;
};
