import useWalletStore from '@/stores/wallet.store';
import { disableAutoConnect } from '@/web3/utils';
import { useDisconnect } from 'wagmi';

const useDisconnectWallet = () => {
  const setWallet = useWalletStore((state) => state.setWallet);

  const config = useDisconnect({
    onSuccess: () => {
      disableAutoConnect();
      config.reset();
      setWallet(null);
    },
  });
  return config;
};

export default useDisconnectWallet;
