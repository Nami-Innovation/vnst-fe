import { logout } from '@/services/auth.api';
import { useActiveChainConfig } from '@/stores/chain.store';
import useWalletStore from '@/stores/wallet.store';
import { ChainType } from '@/web3/constants';
import { disableAutoConnect } from '@/web3/evm/utils';
import { useDisconnect } from 'wagmi';
import useDisconnectWalletTon from './useDisconnectWalletTon';

const useDisconnectWallet = () => {
  const chainConfig = useActiveChainConfig();
  const disconnectWalletTon = useDisconnectWalletTon();
  const setWallet = useWalletStore((state) => state.setWallet);

  const config = useDisconnect({
    onSuccess: () => {
      disableAutoConnect();
      config.reset();
      setWallet(null);
      logout();
    },
  });

  const disconnect = async () => {
    if (chainConfig.chainType === ChainType.TON) {
      disconnectWalletTon();
    } else {
      config.disconnect();
    }
  };

  return disconnect;
};

export default useDisconnectWallet;
