import { PublicKey } from '@solana/web3.js';

export function getExplorerUrl(
  endpoint: string,
  viewTypeOrItemAddress: 'inspector' | PublicKey | string,
  itemType = 'address' // | 'tx' | 'block'
) {
  const getClusterUrlParam = () => {
    let cluster = '';
    if (endpoint === 'localnet') {
      cluster = `custom&customUrl=${encodeURIComponent(
        'http://127.0.0.1:8899'
      )}`;
    } else if (endpoint === 'https://api.devnet.solana.com') {
      cluster = 'devnet';
    }

    return cluster ? `?cluster=${cluster}` : '';
  };

  return `https://explorer.solana.com/${itemType}/${viewTypeOrItemAddress}${getClusterUrlParam()}`;
}
