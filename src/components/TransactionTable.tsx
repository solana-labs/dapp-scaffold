import { useSignatures } from 'hooks/useSignatures';

const confirmationStatusMap = {
  confirmed: { color: 'text-yellow-300', label: 'Confirmed' },
  finalized: { color: 'text-green-300', label: 'Finalized' }
};

const cn = (...classes: string[]) => classes.filter(Boolean).join(' '); // Helper for conditional class selection

export const TransactionTable = () => {
  const { signatures, isLoading, isError } = useSignatures();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="shadow-lg">
      <div className="overflow-x-auto rounded-lg">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Signature</th>
              <th>Timestamp</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {signatures.map(({ blockTime, confirmationStatus, signature }) => {
              const { color, label } =
                confirmationStatusMap[confirmationStatus];
              const timestamp = new Date(blockTime * 1000).toUTCString();

              return (
                <tr key={signature}>
                  <td className="bg-base-300">
                    <a
                      className="link hover:text-gray-400"
                      href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
                      target="_blank"
                    >
                      <p className="w-32 truncate text-sm sm:w-48 md:w-48 lg:w-32 xl:w-48">
                        {signature}
                      </p>
                    </a>
                  </td>
                  <td className="bg-base-300">
                    <p className="text-sm">{timestamp}</p>
                  </td>
                  <td className="bg-base-300">
                    <p className={cn(color, 'text-sm')}>{label}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
