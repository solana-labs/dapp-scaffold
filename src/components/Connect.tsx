import { useConnection } from '@solana/wallet-adapter-react';
import { FC, useCallback, useState } from 'react';
import { notify } from "../utils/notifications";

export const Connect: FC = () => {
    const { connection } = useConnection();
    const [version, setVersion] = useState<string>('');

    const onClick = useCallback(async () => {
        try {
          const version = await connection.getVersion();
          setVersion(version['solana-core']);
        } catch (error: any) {
            notify({ type: 'error', message: `Sign Message failed!`, description: error?.message });
            console.log('error', `Sign Message failed! ${error?.message}`);
        }
    }, [version, connection, notify]);

    return (
        <div>
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={onClick}
            >
                <span className="block group-disabled:hidden" > 
                    Get Solana Version
                </span>
            </button>
            <p>Version : {version}</p>
        </div>
    );
};
