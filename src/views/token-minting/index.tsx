import {
  AccountInfo,
  MintLayout,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { SendTransactionOptions } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { Button, Input, Spin } from "antd";
import React, { FC, FormEventHandler, useState } from "react";
import { LABELS } from "../../constants";
import { notify } from "../../utils/notifications";

const getOrCreateAssociatedAccountInfoWithWallet = async (
  connection: Connection,
  sendTransaction: (
    transaction: Transaction,
    connection: Connection,
    options?: SendTransactionOptions | undefined
  ) => Promise<string>,
  {
    token,
    payer,
    address,
  }: { token: Token; address: PublicKey; payer: PublicKey }
) => {
  // This is a great example on how to derive program addresses (PDA),
  // also a common pattern across solana programs.
  // In solana, an address for the wallet is handled by the spl program
  // if it doesn't exists, it will be created.
  // You can check the implementation of getAssociatedTokenAddress in:
  // https://github.com/solana-labs/solana-program-library/blob/master/token/js/client/token.js#L2277
  const associatedAddress = await Token.getAssociatedTokenAddress(
    token.associatedProgramId,
    token.programId,
    token.publicKey,
    address!
  );
  let associatedAccount: AccountInfo;
  // This is the wallet version of {token.getOrCreateAssociatedAccountInfo}
  try {
    associatedAccount = await token.getAccountInfo(associatedAddress);
  } catch (error) {
    const associatedTokenAccountInstruction = Token.createAssociatedTokenAccountInstruction(
      token.associatedProgramId,
      token.programId,
      token.publicKey,
      associatedAddress,
      address,
      payer
    );
    const transactionId = await sendTransaction(
      new Transaction().add(associatedTokenAccountInstruction),
      connection
    );
    await connection.confirmTransaction(transactionId);
    associatedAccount = await token.getAccountInfo(associatedAddress);
  }
  return associatedAccount;
};

export const TokenMinting: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<Token | null>(null);
  const { connection } = useConnection();
  const { publicKey, sendTransaction, signTransaction } = useWallet();

  // Mint and send tokens form:
  const [amount, setAmount] = useState(0);
  const [destination, setDestination] = useState("");

  const handleSubmitCreateMint: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const mintAccount = Keypair.generate();
      const token = new Token(
        connection,
        mintAccount.publicKey,
        TOKEN_PROGRAM_ID,
        {
          publicKey: publicKey!,
          /* Let's set secret key as empty array because wallet adapter signs it. */
          secretKey: new Uint8Array(0),
        }
      );

      // Rent excemption is calculated on the size of the accounts involved in the transaction most of the times.
      const balanceNeededForRentExcemption = await Token.getMinBalanceRentForExemptAccount(
        connection
      );

      // We have to create an account.
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

      const signedTransaction = await signTransaction!(transaction);
      signedTransaction.partialSign(mintAccount);

      const transactionId = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );
      await connection.confirmTransaction(transactionId, "confirmed");

      notify({
        message: `Token minted ${LABELS.TRANSACTION_SUCCESSFUL} transactionId: ${transactionId}`,
        type: "success",
      });
      setToken(token);
    } catch (error: any) {
      notify({
        message: `${LABELS.TRANSACTION_FAILED} ${error.message}`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitMintToken: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    if (!token) {
      return;
    }
    try {
      setIsLoading(true);

      const fromTokenAccount = await getOrCreateAssociatedAccountInfoWithWallet(
        connection,
        sendTransaction,
        { token, payer: publicKey!, address: publicKey! }
      );
      const toTokenAccount = await getOrCreateAssociatedAccountInfoWithWallet(
        connection,
        sendTransaction,
        { token, payer: publicKey!, address: new PublicKey(destination)! }
      );

      const mintToInstruction = Token.createMintToInstruction(
        token.programId,
        token.publicKey,
        fromTokenAccount.address,
        publicKey!,
        [],
        amount
      );

      await sendTransaction(
        new Transaction().add(mintToInstruction),
        connection
      );

      const transferInstruction = Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        toTokenAccount.address,
        publicKey!,
        [],
        amount - 0.2 // Just a little bit so the account always has a little bit of balance
      );
      const transactionId = await sendTransaction(
        new Transaction().add(transferInstruction),
        connection
      );

      notify({
        message: `Sent ${amount} minted tokens to ${destination} successfully. Transaction Id: ${transactionId}`,
        type: "success",
      });
    } catch (error: any) {
      notify({
        message: `${LABELS.TRANSACTION_FAILED} ${error.message}`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className="flexColumn container"
      style={{
        flex: 1,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "1em",
      }}
    >
      <form onSubmit={handleSubmitCreateMint}>
        <h3>Create mint</h3>
        <Button disabled={isLoading} type="primary" htmlType="submit">
          {isLoading ? "Loading..." : "Mint SPL token"}
        </Button>
        {isLoading ? <Spin spinning /> : null}
      </form>
      {token ? (
        <>
          <dl>
            <dt>Token address:</dt>
            <dd>{token.publicKey.toString()}</dd>
          </dl>
          <form onSubmit={handleSubmitMintToken}>
            <h3>
              This example mints tokens into your wallet and transfers those
              into the destination wallet.
            </h3>
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
            <Button disabled={isLoading} type="primary" htmlType="submit">
              {isLoading ? "Loading..." : "Yes"}
            </Button>
            {isLoading ? <Spin spinning /> : null}
          </form>
        </>
      ) : null}
    </main>
  );
};
