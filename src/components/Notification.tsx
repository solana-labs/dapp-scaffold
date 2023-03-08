import { useEffect } from 'react';
import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import { useConnection } from '@solana/wallet-adapter-react';
import { useNetworkConfiguration } from 'contexts/NetworkConfigurationProvider';
import useNotificationStore from '../stores/useNotificationStore';

const NotificationList = () => {
  const { notifications, set: setNotificationStore } = useNotificationStore(
    (s) => s
  );

  const reversedNotifications = [...notifications].reverse();

  return (
    <div className='pointer-events-none fixed inset-20 z-20 flex items-end px-4 py-6 sm:p-6'>
      <div className='flex w-full flex-col'>
        {reversedNotifications.map((n, idx) => (
          <Notification
            key={`${n.message}${idx}`}
            type={n.type}
            message={n.message}
            description={n.description}
            txid={n.txid}
            onHide={() => {
              setNotificationStore((state: any) => {
                const reversedIndex = reversedNotifications.length - 1 - idx;
                state.notifications = [
                  ...notifications.slice(0, reversedIndex),
                  ...notifications.slice(reversedIndex + 1),
                ];
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Notification = ({ type, message, description, txid, onHide }) => {
  const { connection } = useConnection();
  const { networkConfiguration } = useNetworkConfiguration();

  // TODO: we dont have access to the network or endpoint here..
  // getExplorerUrl(connection., txid, 'tx')
  // Either a provider, context, and or wallet adapter related pro/contx need updated

  useEffect(() => {
    const id = setTimeout(() => {
      onHide();
    }, 8000);

    return () => {
      clearInterval(id);
    };
  }, [onHide]);

  return (
    <div className='bg-bkg-1 pointer-events-auto mx-4 mt-2 mb-12 w-full max-w-sm overflow-hidden rounded-md p-2 shadow-lg ring-1 ring-black ring-opacity-5'>
      <div className='p-4'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            {type === 'success' ? (
              <CheckCircleIcon className='text-green mr-1 h-8 w-8' />
            ) : null}
            {type === 'info' && (
              <InformationCircleIcon className='text-red mr-1 h-8 w-8' />
            )}
            {type === 'error' && <XCircleIcon className='mr-1 h-8 w-8' />}
          </div>
          <div className='ml-2 w-0 flex-1'>
            <div className='text-fgd-1 font-bold'>{message}</div>
            {description ? (
              <p className='text-fgd-2 mt-0.5 text-sm'>{description}</p>
            ) : null}
            {txid ? (
              <div className='flex flex-row'>
                <a
                  href={`https://explorer.solana.com/tx/${txid}?cluster=${networkConfiguration}`}
                  target='_blank'
                  rel='noreferrer'
                  className='link-accent link flex flex-row'
                >
                  <svg
                    className='text-primary-light ml-2 mt-0.5 h-4 w-4 flex-shrink-0'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                    />
                  </svg>
                  <div className='mx-4 flex'>
                    {txid.slice(0, 8)}...
                    {txid.slice(txid.length - 8)}
                  </div>
                </a>
              </div>
            ) : null}
          </div>
          <div className='ml-4 flex flex-shrink-0 self-start'>
            <button
              onClick={() => onHide()}
              className='bg-bkg-2 default-transition text-fgd-3 hover:text-fgd-4 inline-flex rounded-md focus:outline-none'
            >
              <span className='sr-only'>Close</span>
              <XIcon className='h-5 w-5' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationList;
