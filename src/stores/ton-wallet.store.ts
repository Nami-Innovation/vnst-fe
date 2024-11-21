import React from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Address, Cell } from '@ton/core';
import { JettonMaster, TonClient } from '@ton/ton';
import { JettonWallet } from '@/web3/ton/JettonWallet';
import { JETTON_CONFIGS } from '@/web3/ton/constants';

type JestonData = {
  isFetching: boolean;
  userAddress?: Address;
  walletData?: {
    balance: bigint;
    ownerAddress: Address;
    jettonMasterAddress: Address;
    jettonWalletCode: Cell;
  };
};

type Store = {
  jestons: Record<string, JestonData>;
  balance: bigint;
  isFetchingBalance: boolean;
  fetchJettonData: (
    tonClient: TonClient,
    symbol: keyof typeof JETTON_CONFIGS,
    walletAddress: Address
  ) => Promise<void>;
  fetchTonBalance: (
    tonClient: TonClient,
    walletAddress: Address
  ) => Promise<void>;
  reset: () => void;
};

const useTonWalletStore = create<Store>()(
  immer((set, get) => ({
    jestons: {},
    isFetchingBalance: false,
    balance: BigInt(0),
    reset: () => {
      set({ jestons: {} });
    },
    fetchJettonData: async (
      tonClient: TonClient,
      symbol: keyof typeof JETTON_CONFIGS,
      walletAddress: Address
    ) => {
      let existed = get().jestons[symbol];
      if (existed && existed.isFetching) {
        return;
      }

      set((state) => {
        if (!existed) {
          state.jestons[symbol] = { isFetching: true };
        } else {
          state.jestons[symbol].isFetching = true;
        }
      });

      existed = get().jestons[symbol];

      let userAddress = existed?.userAddress;
      const masterAddress = JETTON_CONFIGS[symbol].address;
      if (!userAddress) {
        const jettonMaster = tonClient.open(JettonMaster.create(masterAddress));
        userAddress = await jettonMaster.getWalletAddress(walletAddress);
        set((state) => {
          state.jestons[symbol].userAddress = userAddress;
        });
      }
      const jettonWallet = tonClient.open(
        JettonWallet.createFromAddress(userAddress)
      );
      try {
        const walletData = await jettonWallet.getWalletData();

        set((state) => {
          state.jestons[symbol].walletData = walletData;
        });
      } catch (error) {
        console.error(error);
      } finally {
        set((state) => {
          state.jestons[symbol].isFetching = false;
        });
      }
    },
    fetchTonBalance: async (tonClient: TonClient, walletAddress: Address) => {
      if (get().isFetchingBalance) {
        return;
      }
      set({ isFetchingBalance: true });
      try {
        const balance = await tonClient.getBalance(walletAddress);
        set({ balance });
      } catch (error) {
        console.error(error);
      } finally {
        set({ isFetchingBalance: false });
      }
    },
  }))
);

export default useTonWalletStore;
