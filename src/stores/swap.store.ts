import { create } from 'zustand';
import { produce } from 'immer';
import { getOtcDelta } from '@/services/contract.api';
import { loadContractInfoEVM, loadMarketPriceEVM } from '@/web3/evm/utils';
import { Chain } from '@/web3/constants';
import { TonClient } from '@ton/ton';
import { loadContractInfoTon, loadMarketPriceTON } from '@/web3/ton/utils';

type Store = {
  marketPrice?: number;
  redeemCoveredPrice?: number;
  mintCoveredPrice?: number;
  redeemCoveredAmount?: number;
  mintCoveredAmount?: number;
  redeemFeeRate: number;
  mintLimitMax: number;
  redeemLimitMax: number;
  usdtPool?: number;
  vnstPool?: number;
  loading: boolean;
  otcDelta: number;
  mintFee: number;
  mintLimitVerify: number;
  redeemLimitVerify: number;
  // mint, redeem status (just on TON)
  mintStatus: boolean;
  redeemStatus: boolean;
  loadContractInfo: (chain: Chain, tonClient?: TonClient) => Promise<void>;
  fetchOtcDelta: () => Promise<void>;
  loadMarketPrice: (chain: Chain, tonClient?: TonClient) => Promise<void>;
};

const useSwapStore = create<Store>()((set) => ({
  loading: false,
  redeemFeeRate: 0.1 / 100,
  mintLimitMax: 2000,
  redeemLimitMax: 50000000,
  otcDelta: 0,
  mintFee: 0,
  mintLimitVerify: 0,
  redeemLimitVerify: 0,
  mintStatus: true,
  redeemStatus: true,
  loadContractInfo: async (chain: Chain, tonClient?: TonClient) => {
    set({ loading: true });

    const startTime = Date.now();
    try {
      let contractInfo: Record<string, number | boolean> = {};
      if (chain === Chain.TON) {
        if (!tonClient) {
          throw new Error('TonClient is required');
        }
        contractInfo = await loadContractInfoTon(tonClient);

        console.log('contractInfo', contractInfo);
      } else {
        contractInfo = await loadContractInfoEVM();
      }
      const endTime = Date.now();

      set(contractInfo);

      const duration = endTime - startTime;

      if (duration < 500) {
        setTimeout(() => {
          set({ loading: false });
        }, 500 - duration);
      } else {
        set({ loading: false });
      }
    } catch (error) {
      console.error('loadContractInfo Error: ', error);
      set({ loading: false });
    }
  },
  fetchOtcDelta: async () => {
    try {
      const otcDelta = await getOtcDelta();
      set(
        produce((state) => {
          state.otcDelta = otcDelta;
        })
      );
    } catch (error) {
      console.error('Error: ', error);
    }
  },
  loadMarketPrice: async (chain: Chain, tonClient?: TonClient) => {
    try {
      let marketPrice = 0;
      if (chain === Chain.TON) {
        if (!tonClient) {
          throw new Error('TonClient is required');
        }
        marketPrice = await loadMarketPriceTON(tonClient);
      } else {
        marketPrice = await loadMarketPriceEVM();
      }
      set({ marketPrice });
    } catch (error) {
      console.error('loadMarketPrice Error: ', error);
    }
  },
}));

export default useSwapStore;
