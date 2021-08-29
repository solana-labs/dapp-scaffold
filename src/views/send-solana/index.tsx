import { MintLayout, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Transaction,
  LAMPORTS_PER_SOL,
  Keypair,
  SystemProgram,
} from "@solana/web3.js";
import { Button, Input, Spin } from "antd";
import React, { FC, useState } from "react";
import { createTokenAccount } from "../../actions";
import { LABELS } from "../../constants";
import { useConnection } from "../../contexts/connection";
import { notify } from "../../utils/notifications";

export const SendSolana: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [destination, setDestination] = useState("");
  const { publicKey, signTransaction } = useWallet();
  const connection = useConnection();

  const createMint = async () => {
    try {
      setIsLoading(true);

      const mintAccount = Keypair.generate();
      const token = new Token(
        connection,
        mintAccount.publicKey,
        TOKEN_PROGRAM_ID,
        {
          publicKey: publicKey!,
          secretKey: new Uint8Array(
            0
          ) /* Let's set secret key as empty array because wallet adapter signs it. */,
        }
      );

      const balanceNeededForRentExcemption = await Token.getMinBalanceRentForExemptAccount(
        connection
      );

      const createAccountInstruction = SystemProgram.createAccount({
        fromPubkey: publicKey!,
        newAccountPubkey: mintAccount.publicKey,
        lamports: balanceNeededForRentExcemption,
        space: MintLayout.span,
        programId: TOKEN_PROGRAM_ID,
      });

      const createInitMintInstruction = Token.createInitMintInstruction(
        TOKEN_PROGRAM_ID,
        mintAccount.publicKey,
        9,
        publicKey!,
        null
      );

      const recentBlockhash = await connection.getRecentBlockhash();
      const transaction = new Transaction({
        recentBlockhash: recentBlockhash.blockhash,
        feePayer: publicKey!,
      })
        .add(createAccountInstruction)
        .add(createInitMintInstruction);
      const signedTransaction = await signTransaction(transaction);
      const transactionId = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );

      notify({
        message: `${LABELS.TRANSACTION_SUCCESSFUL} transactionId: ${transactionId}`,
        type: "success",
      });

      const fromTokenAccount = await token.getOrCreateAssociatedAccountInfo(publicKey!);
      // var toTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
      //   toWallet.publicKey,
      // );
      

    } catch (error) {
      notify({
        message: `${LABELS.TRANSACTION_FAILED} ${error.message}`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const lamports = LAMPORTS_PER_SOL / amount;

      // Note this transaction instruction is handled internally by the SystemProgram class;
      // however, most program calls look similar to this.
      const transactionInstruction = Token.createMint;

      // Let's create a transaction; A recent blockhash is required to sign the transaction.
      // Also, the feePayer is the account that will pay the fee for the transaction.
      const recentBlockhash = await connection.getRecentBlockhash();

      const transaction = new Transaction({
        recentBlockhash: recentBlockhash.blockhash,
        feePayer: publicKey!,
      }); //.add(
      //   // Transactions are formed by an array of instructions.
      //   transactionInstruction
      // );

      // The transaction is signed by the wallet.
      const signedTransaction = await signTransaction(transaction);
      const transactionId = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );
      await connection.confirmTransaction(transactionId);
      notify({
        message: `${LABELS.TRANSACTION_SUCCESSFUL} transactionId: ${transactionId}`,
        type: "success",
      });
    } catch (error) {
      notify({
        message: `${LABELS.TRANSACTION_FAILED} ${error.message}`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flexColumn container"
      style={{
        flex: 1,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "1em",
      }}
      onSubmit={handleFormSubmit}
    >
      <h3>This is a simple example on how to send Solana tokens</h3>
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value, 10))}
        required
      />
      <div className="spacer" />
      <Input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
      />
      <div className="spacer" />
      <Button disabled={isLoading} type="primary" htmlType="submit">
        {isLoading ? "Loading..." : "Send"}
      </Button>
      {isLoading ? <Spin spinning /> : null}
    </form>
  );
};
