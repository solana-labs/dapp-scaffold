import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  SystemProgram,
  PublicKey,
} from "@solana/web3.js";
import { Button, Input, Spin } from "antd";
import React, { FC, useState } from "react";
import { LABELS } from "../../constants";
import { useConnection } from "../../contexts/connection";
import { notify } from "../../utils/notifications";
import { sendAndConfirmWalletTransaction } from "../../utils/transaction";

export const SendSolana: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [destination, setDestination] = useState("");
  const { publicKey, signTransaction } = useWallet();
  const connection = useConnection();

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const lamports = LAMPORTS_PER_SOL / amount;

      // Note this transaction instruction is formed internally by the SystemProgram class;
      // however, most program calls look similar to this.
      const transactionInstruction = SystemProgram.transfer({
        fromPubkey: publicKey!,
        toPubkey: new PublicKey(destination),
        lamports,
        programId: TOKEN_PROGRAM_ID,
      });

      const transactionId = await sendAndConfirmWalletTransaction(connection, signTransaction, {
        feePayer: publicKey!,
        instructions: [transactionInstruction],
      });

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
