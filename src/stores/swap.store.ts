import { create } from 'zustand';
import { produce } from 'immer';
import { readContracts } from 'wagmi';
import { RATE_DECIMAL, VNST_ADDRESS, VNST_DECIMAL } from '@/web3/constants';
import { vnstABI } from '@/web3/abi';
import { formatUnits } from 'viem';
import { getOtcDelta } from '@/services/contract.api';
import { readContract } from '@wagmi/core';

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
  load: () => Promise<void>;
  fetchOtcDelta: () => Promise<void>;
  loadMarketPrice: () => Promise<void>;
};

const contractToken = {
  address: VNST_ADDRESS,
  abi: vnstABI,
};

const useSwapStore = create<Store>()((set) => ({
  loading: false,
  redeemFeeRate: 0.1 / 100,
  mintLimitMax: 2000,
  redeemLimitMax: 50000000,
  otcDelta: 0,
  load: async () => {
    set(
      produce((state) => {
        state.loading = true;
      })
    );
    const startTime = Date.now();
    try {
      const [
        rCenterResult,
        redeemCoveredPriceResult,
        mintCoveredPriceResult,
        redeemCoveredAmountResult,
        mintCoveredAmountResult,
        vnstPoolResult,
        usdtPoolResult,
        redeemFeeResult,
        mintLimitMaxResult,
        redeemLimitMaxResult,
      ] = await readContracts({
        contracts: [
          {
            ...contractToken,
            functionName: 'market_price',
          },
          {
            ...contractToken,
            functionName: 'redeem_covered_price',
          },
          {
            ...contractToken,
            functionName: 'mint_covered_price',
          },
          {
            ...contractToken,
            functionName: 'redeem_covered_amount',
          },
          {
            ...contractToken,
            functionName: 'mint_covered_amount',
          },
          {
            ...contractToken,
            functionName: 'vnst_pool',
          },
          {
            ...contractToken,
            functionName: 'usdt_pool',
          },
          {
            ...contractToken,
            functionName: 'redeem_fee',
          },
          {
            ...contractToken,
            functionName: 'max_mint_limit',
          },
          {
            ...contractToken,
            functionName: 'max_redeem_limit',
          },
        ],
      });

      const endTime = Date.now();

      set(
        produce((state) => {
          if (rCenterResult.status === 'success') {
            state.marketPrice = Number(
              formatUnits(rCenterResult.result, RATE_DECIMAL)
            );
          }

          if (redeemCoveredPriceResult.status === 'success') {
            state.redeemCoveredPrice = Number(
              formatUnits(redeemCoveredPriceResult.result, RATE_DECIMAL)
            );
          }

          if (mintCoveredPriceResult.status === 'success') {
            state.mintCoveredPrice = Number(
              formatUnits(mintCoveredPriceResult.result, RATE_DECIMAL)
            );
          }

          if (redeemCoveredAmountResult.status === 'success') {
            state.redeemCoveredAmount = Number(
              formatUnits(redeemCoveredAmountResult.result, VNST_DECIMAL)
            );
          }

          if (mintCoveredAmountResult.status === 'success') {
            state.mintCoveredAmount = Number(
              formatUnits(mintCoveredAmountResult.result, VNST_DECIMAL)
            );
          }

          if (vnstPoolResult.status === 'success') {
            state.vnstPool = Number(
              formatUnits(vnstPoolResult.result, VNST_DECIMAL)
            );
          }

          if (usdtPoolResult.status === 'success') {
            state.usdtPool = Number(
              formatUnits(usdtPoolResult.result, VNST_DECIMAL)
            );
          }

          if (redeemFeeResult.status === 'success') {
            state.redeemFeeRate = Number(
              formatUnits(redeemFeeResult.result, RATE_DECIMAL)
            );
          }

          if (mintLimitMaxResult.status === 'success') {
            state.mintLimitMax = Number(
              formatUnits(mintLimitMaxResult.result, VNST_DECIMAL)
            );
          }

          if (redeemLimitMaxResult.status === 'success') {
            state.redeemLimitMax = Number(
              formatUnits(redeemLimitMaxResult.result, VNST_DECIMAL)
            );
          }
        })
      );
      const duration = endTime - startTime;
      if (duration < 500) {
        setTimeout(() => {
          set(
            produce((state) => {
              state.loading = false;
            })
          );
        }, 500 - duration);
      } else {
        set(
          produce((state) => {
            state.loading = false;
          })
        );
      }
    } catch (error) {
      set(
        produce((state) => {
          state.loading = false;
        })
      );
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
  loadMarketPrice: async () => {
    const marketPrice = await readContract({
      ...contractToken,
      functionName: 'market_price',
    });
    set(
      produce((state) => {
        state.marketPrice = Number(formatUnits(marketPrice, RATE_DECIMAL));
      })
    );
  },
}));

export default useSwapStore;
