import {useEffect, useState} from 'react'
import {
    CheckCircleIcon,
    InformationCircleIcon,
    XCircleIcon,
} from '@heroicons/react/outline'
import {XIcon} from '@heroicons/react/solid'
import useNotificationStore from '../stores/useNotificationStore'
import {useConnection} from '@solana/wallet-adapter-react';
import {getExplorerUrl} from '../utils/explorer'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import faker from "faker";
import StepNSolBalanceChart from "./StepNSolBalanceChart";
import StepNTokenSwapChart from "./StepNTokenSwapChart";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({min: 0, max: 1000})),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({min: 0, max: 1000})),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export const SnapshotList = () => {

    return (
        <div className={`grid grid-cols-2 justify-items-center gap-4 my-5`}>
            <div>
                <StepNSolBalanceChart width={700} height={500}/>
            </div>
            <div >
                <StepNTokenSwapChart width={700} height={500}/>
            </div>
            <div >
                <Bar options={options} width={700} data={data}/>
            </div>
            <div>
                <Bar options={options} width={700} data={data}/>
            </div>
            <div>
                <Bar options={options} width={700} data={data}/>
            </div>
        </div>
    );
}

// const Notification = ({ type, message, description, txid, onHide }) => {
//   const { connection } = useConnection();
//
//   // TODO: we dont have access to the network or endpoint here..
//   // getExplorerUrl(connection., txid, 'tx')
//   // Either a provider, context, and or wallet adapter related pro/contx need updated
//
//
//   useEffect(() => {
//     const id = setTimeout(() => {
//       onHide()
//     }, 8000);
//
//     return () => {
//       clearInterval(id);
//     };
//   }, [onHide]);
//
//   return (
//     <div
//       className={`max-w-sm w-full bg-bkg-1 shadow-lg rounded-md mt-2 pointer-events-auto ring-1 ring-black ring-opacity-5 p-2 mx-4 mb-12 overflow-hidden`}
//     >
//       <div className={`p-4`}>
//         <div className={`flex items-center`}>
//           <div className={`flex-shrink-0`}>
//             {type === 'success' ? (
//               <CheckCircleIcon className={`h-8 w-8 mr-1 text-green`} />
//             ) : null}
//             {type === 'info' && <InformationCircleIcon className={`h-8 w-8 mr-1 text-red`} />}
//             {type === 'error' && (
//               <XCircleIcon className={`h-8 w-8 mr-1`} />
//             )}
//           </div>
//           <div className={`ml-2 w-0 flex-1`}>
//             <div className={`font-bold text-fgd-1`}>{message}</div>
//             {description ? (
//               <p className={`mt-0.5 text-sm text-fgd-2`}>{description}</p>
//             ) : null}
//             {txid ? (
//               <div className="flex flex-row">
//
//                 <a
//                   href={'https://explorer.solana.com/tx/' + txid + `?cluster=devnet`}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="flex flex-row link link-accent"
//                 >
//                   <svg className="flex-shrink-0 h-4 ml-2 mt-0.5 text-primary-light w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
//                   <div className="flex mx-4">{txid.slice(0, 8)}...
//                     {txid.slice(txid.length - 8)}
//                   </div>
//                 </a>
//               </div>
//             ) : null}
//           </div>
//           <div className={`ml-4 flex-shrink-0 self-start flex`}>
//             <button
//               onClick={() => onHide()}
//               className={`bg-bkg-2 default-transition rounded-md inline-flex text-fgd-3 hover:text-fgd-4 focus:outline-none`}
//             >
//               <span className={`sr-only`}>Close</span>
//               <XIcon className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

export default SnapshotList
