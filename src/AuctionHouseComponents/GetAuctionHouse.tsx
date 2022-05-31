import { FC, useCallback, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { show} from "../api/src/auction-house";
import { Connection, PublicKey, Keypair, clusterApiUrl, SystemProgram, Transaction } from '@solana/web3.js'



export const GetAuctionHouse: FC = () => {
    let walletAddress = " ";
    let AuctionAddress = " ";

    const { publicKey } = useWallet();
    const [AHInfo, setAHInfo] = useState([]);
    const [AHFetched, setAHFetched] = useState(false);
    let arr = [];

    const wallet = useWallet();
    if (wallet.connected && wallet.publicKey) {
        walletAddress = wallet.publicKey.toString()
        console.log("pubkey is",wallet.publicKey.toString());
    }

    const getAuctionHouse = () => {
        // let res = show(null, wallet, "So11111111111111111111111111111111111111112");
        // console.log("Result is", res);
        show({ env: 'devnet', wallet: wallet }).then(x => {
            // setAHInfo('Auction House: ' + x.auctionHouseKey +
            //     'Mint: ' + x.treasuryMint.toBase58() +
            //     'Authority: ' + x.authority.toBase58() +
            //     'Creator: ' + x.creator.toBase58() +
            //     'Fee Payer Acct:' + x.auctionHouseFeeAccount.toBase58() +
            //     'Treasury Acct: ' + x.auctionHouseTreasury.toBase58() +
            //     'Fee Payer Withdrawal Acct: ' + x.feeWithdrawalDestination.toBase58() +
            //     'Treasury Withdrawal Acct: ' + x.treasuryWithdrawalDestination.toBase58() +
            //     'Seller Fee Basis Points: ' + x.sellerFeeBasisPoints +
            //     'Requires Sign Off: ' + x.requiresSignOff +
            //     'Can Change Sale Price: ' + x.canChangeSalePrice +
            //     'AH Bump: ' + x.bump +
            //     'AH Fee Bump: ' + x.feePayerBump +
            //     'AH Treasury Bump: ' + x.treasuryBump);
            arr.push(x.auctionHouseKey, x.treasuryMint.toBase58(), x.authority.toBase58(),
            x.creator.toBase58(),x.auctionHouseFeeAccount.toBase58(),
            x.auctionHouseTreasury.toBase58(), x.feeWithdrawalDestination.toBase58(), x.feeWithdrawalDestination.toBase58(),
            x.sellerFeeBasisPoints, x.requiresSignOff, x.canChangeSalePrice, x.bump, x.feePayerBump,
            x.treasuryBump
            );

            setTimeout( () => {
                setAHInfo(arr);
                setAHFetched(true);
            }, 500);


            AuctionAddress = x.auctionHouseKey
        });
    }

    return (
        <div>
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={getAuctionHouse}
                disabled={!publicKey}
            >

            <span className="block group-disabled:hidden">Get AH Info</span>
            </button>
            { AHFetched ?   <>
                            <h3>Auction House Key: {AHInfo[0]}</h3>
                            <h3>Mint: {AHInfo[1]}</h3>
                            <h3>Authority: {AHInfo[2]}</h3>
                            <h3>Creator: {AHInfo[3]}</h3>
                            <h3>Fee Payer Acct: {AHInfo[4]}</h3>
                            <h3>Treasury Acct: {AHInfo[5]}</h3>
                            <h3>Fee Payer Withdrawal Acct: {AHInfo[6]}</h3>
                            <h3>Treasury Withdrawal Acct: {AHInfo[7]}</h3>
                            <h3>Seller Fee Basis Points: {AHInfo[8]}</h3>
                            <h3>Requires Sign Off: {AHInfo[9]}</h3>
                            <h3>Can Change Sale Price: {AHInfo[10]}</h3>
                            <h3>AH Bump: {AHInfo[11]}</h3>
                            <h3>AH Fee Bump: {AHInfo[12]}</h3>
                            </>
                            :
                            <></>
            }

        </div>
    )
}