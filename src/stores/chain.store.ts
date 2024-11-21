import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Chain, ChainConfigs } from '@/web3/constants';
import { setCookie } from 'cookies-next';

type Store = {
  chain: Chain;
  switchChain: (chain: Chain) => void;
};

const useChainStore = create<Store>()(
  immer((set) => ({
    chain: Chain.BNB,
    switchChain: (chain) =>
      set((state) => {
        state.chain = chain;
        setCookie('network', chain);
      }),
  }))
);

export const useActiveChainConfig = () =>
  useChainStore((state) => ChainConfigs[state.chain]);

export const useActiveChain = () => useChainStore((state) => state.chain);

export default useChainStore;
