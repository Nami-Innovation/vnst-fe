import { create } from 'zustand';
import { produce } from 'immer';
import { Chain, ChainConfigs } from '@/web3/constants';

type Store = {
  chain: Chain;
  switchChain: (chain: Chain) => void;
  isOpenConnectWallet: boolean;
  toggleConnectWalletModal: (isOpen: boolean) => void;
};

const useAppStore = create<Store>()((set) => ({
  isOpenConnectWallet: false,
  chain: Chain.BNB,
  switchChain: (chain) =>
    set(
      produce((state) => {
        state.chain = chain;
      })
    ),
  toggleConnectWalletModal: (isOpen) =>
    set(
      produce((state) => {
        state.isOpenConnectWallet = isOpen;
      })
    ),
}));

const useActiveChain = () => useAppStore((state) => ChainConfigs[state.chain]);

export default useAppStore;
