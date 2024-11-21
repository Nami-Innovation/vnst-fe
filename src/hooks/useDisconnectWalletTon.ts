import { logout } from '@/services/auth.api';
import useTonWalletStore from '@/stores/ton-wallet.store';
import useWalletStore from '@/stores/wallet.store';
import { useTonConnectUI } from '@tonconnect/ui-react';

const useDisconnectWalletTon = () => {
  const [tonConnectUI] = useTonConnectUI();
  const setWallet = useWalletStore((state) => state.setWallet);
  const resetTonWalletData = useTonWalletStore((state) => state.reset);

  const disconnect = async () => {
    if (tonConnectUI.connected) await tonConnectUI.disconnect();
    setWallet(null);
    resetTonWalletData();
    logout();
  };

  return disconnect;
};

export default useDisconnectWalletTon;
