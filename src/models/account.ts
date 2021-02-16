import {
  Account,
  AccountInfo,
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";

import { AccountInfo as TokenAccountInfo, Token } from "@solana/spl-token";
import { TOKEN_PROGRAM_ID } from "../utils/ids";

export interface TokenAccount {
  pubkey: PublicKey;
  account: AccountInfo<Buffer>;
  info: TokenAccountInfo;
}

export function approve(
  instructions: TransactionInstruction[],
  cleanupInstructions: TransactionInstruction[],
  account: PublicKey,
  owner: PublicKey,
  amount: number,
  autoRevoke = true,

  // if delegate is not passed ephemeral transfer authority is used
  delegate?: PublicKey
): Account {
  const tokenProgram = TOKEN_PROGRAM_ID;
  const transferAuthority = new Account();

  instructions.push(
    Token.createApproveInstruction(
      tokenProgram,
      account,
      delegate ?? transferAuthority.publicKey,
      owner,
      [],
      amount
    )
  );

  if (autoRevoke) {
    cleanupInstructions.push(
      Token.createRevokeInstruction(tokenProgram, account, owner, [])
    );
  }

  return transferAuthority;
}
