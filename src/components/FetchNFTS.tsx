import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
    Keypair,
    SystemProgram,
    Transaction,
    TransactionSignature,
} from "@solana/web3.js";
import { FC, useCallback, useState } from "react";
import { notify } from "../utils/notifications";
import {
    Metaplex,
    keypairIdentity,
    bundlrStorage,
    walletAdapterIdentity,
} from "@metaplex-foundation/js-next";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import {NFTS} from "./NFTS";
export const FetchNFTS: FC = () => {
    const [NFTList, setNFTList] = useState([]);
    

    const connection = new Connection(clusterApiUrl("devnet"));
   

    let myNFTs;
    let indexKeys = 0;
    let arr = [];


    const { publicKey } = useWallet();
    const wallet = useWallet();
    const metaplex = Metaplex.make(connection)
        .use(walletAdapterIdentity(wallet))
        .use(bundlrStorage());

    const onClick = useCallback(async () => {
        try {
            myNFTs = await metaplex
                .nfts()
                .findAllByOwner(metaplex.identity().publicKey);

            console.log(myNFTs);
            myNFTs.map(async (x) => {
                let uri = await fetch(x.uri);
                let res = await uri.json();
                arr.push(res);
                console.log("name is", res.image);
            });
            setTimeout(() => {
                setNFTList(arr); 
              }, 1000);
            // settest(true);
            // await updateNFTs();
            console.log("NFTList is", arr);
        } catch (err) {
            console.log(err);
        }
    }, [notify, connection]);

    const updateNFTs = async () => {
        await setNFTList(arr);

    }
    return (
        <div>
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={onClick}
                disabled={!publicKey}
            >
                <div className="hidden group-disabled:block ">
                    Wallet not connected
                </div> 
                <span className="block group-disabled:hidden">Fetch NFTS</span>
            </button><br/><br/><br/>
            <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Your NFTS
        </h1><br/>
            <div className="row">
                    
                        {NFTList.map((x) => {
                            // let uri = await fetch(x.uri);
                            // let res = await uri.json();
                            // return <img width={200} height={200} src={x} key={indexKeys++}/>;
                            return  <NFTS data={x} key={indexKeys++}/> 
                        })}</div>
                   
            {/* <button onClick={()=> settest(true)}>update</button> */}

        </div>
    );
};
