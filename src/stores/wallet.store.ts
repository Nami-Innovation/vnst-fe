import { create } from 'zustand';
import { produce } from 'immer';
import { Wallet } from '@/@type/wallet.type';

type Store = {
  wallet?: Wallet;
  accessToken?: string;
  isLogging: boolean;
  setWallet: (wallet: Wallet | null) => void;
  setAccessToken: (accessToken: string) => void;
  setIsLogging: (isLogging: boolean) => void;
};

const useWalletStore = create<Store>()((set) => ({
  isLogging: false,
  setIsLogging: (isLogging: boolean) =>
    set(
      produce((state) => {
        state.isLogging = isLogging;
      })
    ),
  setWallet: (wallet: Wallet | null) =>
    set(
      produce((state) => {
        state.wallet = wallet;
      })
    ),
  setAccessToken: (accessToken: string) =>
    set(
      produce((state) => {
        state.accessToken = accessToken;
      })
    ),
}));

export const useWallet = () => useWalletStore((state) => state.wallet);

export default useWalletStore;
