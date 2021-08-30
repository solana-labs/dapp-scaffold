import SplToken, {
  MintLayout,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  AccountInfo,
  Keypair,
  PublicKey,
  sendAndConfirmRawTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { Button, Col, Input, Row, Spin } from "antd";
import React, { FC, useState } from "react";
import { LABELS } from "../../constants";
import { useConnection } from "../../contexts/connection";
import { notify } from "../../utils/notifications";

export const TokenMinting: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const connection = useConnection();
  const { publicKey, signTransaction } = useWallet();
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

      let recentBlockhash = await connection.getRecentBlockhash();
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

      const fromTokenAccount = await token.getOrCreateAssociatedAccountInfo(
        publicKey!
      );

      const toTokenAccount = await token.getOrCreateAssociatedAccountInfo(
        new PublicKey("/test")
      );

      await token.mintTo(fromTokenAccount.address, publicKey!, [], 1000000000);

      await token.setAuthority(
        token.publicKey,
        null,
        "MintTokens",
        publicKey!,
        []
      );

      // Add token transfer instructions to transaction
      recentBlockhash = await connection.getRecentBlockhash();
      const sendTransaction = new Transaction({
        recentBlockhash: recentBlockhash.blockhash,
        feePayer: publicKey!,
      }).add(
        Token.createTransferInstruction(
          TOKEN_PROGRAM_ID,
          fromTokenAccount.address,
          toTokenAccount.address,
          publicKey!,
          [],
          1
        )
      );

      // Sign transaction, broadcast, and confirm
      const signature = await sendAndConfirmRawTransaction(
        connection,
        transaction.serialize()
      );
      console.log("SIGNATURE", signature);
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
      onSubmit={() => {}}
    >
      <h3>Mint a token</h3>
      <Button disabled={isLoading} type="primary" htmlType="submit">
        {isLoading ? "Loading..." : "Mint and send SPL token"}
      </Button>
      {isLoading ? <Spin spinning /> : null}
    </form>
  );
};
