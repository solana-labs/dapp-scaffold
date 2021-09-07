import { PublicKey } from "@solana/web3.js";
import { useTokens } from "../contexts/tokenMap";
import { getTokenName } from "../utils/utils";

export function useTokenName(mintAddress?: string | PublicKey) {
  const { tokenMap } = useTokens();
  const address =
    typeof mintAddress === "string" ? mintAddress : mintAddress?.toBase58();
  return getTokenName(tokenMap, address);
}
