import dynamic from 'next/dynamic';
import { useNetworkConfiguration } from '../contexts/NetworkConfigurationProvider';

const NetworkSwitcher = () => {
  const { networkConfiguration, setNetworkConfiguration } =
    useNetworkConfiguration();

  console.log(networkConfiguration);

  return (
    <label className='label cursor-pointer'>
      <a>Network</a>
      <select
        value={networkConfiguration}
        onChange={(e) => setNetworkConfiguration(e.target.value)}
        className='select max-w-xs'
      >
        <option value='mainnet-beta'>main</option>
        <option value='devnet'>dev</option>
        <option value='testnet'>test</option>
      </select>
    </label>
  );
};

export default dynamic(() => Promise.resolve(NetworkSwitcher), {
  ssr: false,
});
