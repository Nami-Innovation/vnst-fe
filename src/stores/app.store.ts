import { create } from 'zustand';
import { produce } from 'immer';

type Store = {
  isOpenConnectWallet: boolean;
  toggleConnectWalletModal: (isOpen: boolean) => void;
};

const useAppStore = create<Store>()((set) => ({
  isOpenConnectWallet: false,
  toggleConnectWalletModal: (isOpen) =>
    set(
      produce((state) => {
        state.isOpenConnectWallet = isOpen;
      })
    ),
}));

export default useAppStore;
