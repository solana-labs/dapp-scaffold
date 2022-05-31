import { FC, useCallback, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { show} from "../api/src/auction-house";
import { Connection, PublicKey, Keypair, clusterApiUrl, SystemProgram, Transaction } from '@solana/web3.js'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



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

    function createData(name, value) {
        return { name, value};
      }

    const rows = [
        createData('Auction House Key', AHInfo[0] ),
        createData('Mint', AHInfo[1]),
        createData('Authority', AHInfo[2]),
        createData('Creator', AHInfo[3] ),
        createData('Fee Payer Account', AHInfo[4] ),
        createData('Treasury Account', AHInfo[5]),
        createData('Fee Payer Withdrawal Account', AHInfo[6]),
        createData('Seller Fee Basis Points', AHInfo[7]),
        createData('AH Bump', AHInfo[11]),
        createData('AH Fee Bump', AHInfo[12]),

        // createData('Creator', 305, 3.7, 67, 4.3),
        // createData('Creator', 305, 3.7, 67, 4.3),
        // createData('Creator', 305, 3.7, 67, 4.3),
      ];
    
      const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

    const AHTable = () => {
        return (
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Attribute</StyledTableCell>
                  <StyledTableCell align="right">Value</StyledTableCell>
                  {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.value}</StyledTableCell>

                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
    }

    const getAuctionHouse = () => {
      
        show({ env: 'devnet', wallet: wallet }).then(x => {
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
            ><div className="hidden group-disabled:block ">
            Wallet not connected
            </div>

            <span className="block group-disabled:hidden">Get Auction House Info</span>
            </button>
            { AHFetched ?   
                            // <>
                            // <h3>Auction House Key: {AHInfo[0]}</h3>
                            // <h3>Mint: {AHInfo[1]}</h3>
                            // <h3>Authority: {AHInfo[2]}</h3>
                            // <h3>Creator: {AHInfo[3]}</h3>
                            // <h3>Fee Payer Acct: {AHInfo[4]}</h3>
                            // <h3>Treasury Acct: {AHInfo[5]}</h3>
                            // <h3>Fee Payer Withdrawal Acct: {AHInfo[6]}</h3>
                            // <h3>Treasury Withdrawal Acct: {AHInfo[7]}</h3>
                            // <h3>Seller Fee Basis Points: {AHInfo[8]}</h3>
                            // <h3>Requires Sign Off: {AHInfo[9]}</h3>
                            // <h3>Can Change Sale Price: {AHInfo[10]}</h3>
                            // <h3>AH Bump: {AHInfo[11]}</h3>
                            // <h3>AH Fee Bump: {AHInfo[12]}</h3>
                            // </>
                            <AHTable />
                            :
                            <></>
            }

        </div>
    )
}