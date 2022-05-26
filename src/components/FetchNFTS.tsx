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
    // const [test, settest] = useState(true);

    const connection = new Connection(clusterApiUrl("devnet"));
    // const key = [1,90,27,228,91,62,245,81,208,23,124,206,118,237,164,26,237,156,197,60,139,77,178,90,5,35,34,5,108,97,244,121,240,51,231,189,237,131,63,125,244,114,198,95,83,103,122,253,64,106,180,25,123,16,45,99,224,225,121,156,142,

    let myNFTs;
    let indexKeys = 0;
    let arr = [];


    // const wallet = Keypair.fromSecretKey(secret, true);
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
        await settest(true);

    }

    return (
        <div>
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={onClick}
                disabled={0}
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
                            return  <NFTS data={x}/> 
                        })}</div>
                   
            {/* <button onClick={()=> settest(true)}>update</button> */}

        </div>
    );
};
