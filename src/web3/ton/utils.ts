import {
  Address,
  beginCell,
  storeMessage,
  TonClient,
  Transaction,
} from '@ton/ton';
import { JETTON_CONFIGS, TON_VNST_ADDRESS } from './constants';
import { formatUnits } from 'viem';

const decimals = JETTON_CONFIGS.VNST.decimals;

export const loadContractInfoTon = async (tonClient: TonClient) => {
  const result = await tonClient.runMethod(
    TON_VNST_ADDRESS,
    'get_info_contract'
  );

  const cell = result.stack.readCell().beginParse();

  const poolSlice = cell.loadRef().beginParse();
  const priceSlice = cell.loadRef().beginParse();
  const limitSlice = cell.loadRef().beginParse();
  const feeAndStatusSlice = cell.loadRef().beginParse();

  const poolInfo = {
    usdtPool: Number(formatUnits(poolSlice.loadUintBig(128), decimals)),
    vnstPool: Number(formatUnits(poolSlice.loadUintBig(128), decimals)),
    operationPool: Number(formatUnits(poolSlice.loadUintBig(256), decimals)),
  };

  const priceInfo = {
    marketPrice: Number(formatUnits(priceSlice.loadUintBig(128), decimals)),
    redeemCoveredPrice: Number(
      formatUnits(priceSlice.loadUintBig(128), decimals)
    ),
    mintCoveredPrice: Number(
      formatUnits(priceSlice.loadUintBig(128), decimals)
    ),
    redeemCoveredAmount: Number(
      formatUnits(priceSlice.loadUintBig(128), decimals)
    ),
    mintCoveredAmount: Number(
      formatUnits(priceSlice.loadUintBig(128), decimals)
    ),
  };

  const limitInfo = {
    minRedeemLimit: Number(formatUnits(limitSlice.loadUintBig(128), decimals)),
    maxRedeemLimit: Number(formatUnits(limitSlice.loadUintBig(128), decimals)),
    minMintLimit: Number(formatUnits(limitSlice.loadUintBig(128), decimals)),
    maxMintLimit: Number(formatUnits(limitSlice.loadUintBig(128), decimals)),
    mintLimitVerify: Number(formatUnits(limitSlice.loadUintBig(128), decimals)),
    redeemLimitVerify: Number(
      formatUnits(limitSlice.loadUintBig(128), decimals)
    ),
  };

  const feeAndStatusInfo = {
    redeemFee: Number(formatUnits(feeAndStatusSlice.loadUintBig(64), decimals)),
    mintFee: Number(formatUnits(feeAndStatusSlice.loadUintBig(64), decimals)),
    mintStatus: Number(feeAndStatusSlice.loadUint(1)) === 1,
    redeemStatus: Number(feeAndStatusSlice.loadUint(1) === 1),
  };

  return {
    marketPrice: priceInfo.marketPrice,
    redeemCoveredPrice: priceInfo.redeemCoveredPrice,
    mintCoveredPrice: priceInfo.mintCoveredPrice,
    redeemCoveredAmount: priceInfo.redeemCoveredAmount,
    mintCoveredAmount: priceInfo.mintCoveredAmount,
    vnstPool: poolInfo.vnstPool,
    usdtPool: poolInfo.usdtPool,
    mintFee: feeAndStatusInfo.mintFee,
    redeemFeeRate: feeAndStatusInfo.redeemFee,
    mintLimitMax: limitInfo.maxMintLimit,
    redeemLimitMax: limitInfo.maxRedeemLimit,
    mintLimitVerify: limitInfo.mintLimitVerify,
    redeemLimitVerify: limitInfo.redeemLimitVerify,
    mintStatus: feeAndStatusInfo.mintStatus,
    redeemStatus: feeAndStatusInfo.redeemStatus,
  };
};

export const loadMarketPriceTON = async (tonClient: TonClient) => {
  const result = await tonClient.runMethod(
    TON_VNST_ADDRESS,
    'get_market_price'
  );

  return Number(formatUnits(result.stack.readBigNumber(), decimals));
};

interface WaitForTransactionOptions {
  walletAddress: Address;
  refetchInterval?: number;
  refetchLimit?: number;
  queryId: number;
}

export const waitForTransaction = async (
  options: WaitForTransactionOptions,
  client: TonClient
): Promise<Transaction | null> => {
  const {
    refetchInterval = 1000,
    refetchLimit,
    walletAddress,
    queryId,
  } = options;

  return new Promise((resolve) => {
    let refetches = 0;
    const interval = setInterval(async () => {
      refetches += 1;

      console.log('waiting transaction...');
      try {
        const state = await client.getContractState(walletAddress);
        if (!state || !state.lastTransaction) {
          clearInterval(interval);
          resolve(null);
          return;
        }
        const lastLt = state.lastTransaction.lt;
        const lastHash = state.lastTransaction.hash;
        const lastTx = await client.getTransaction(
          walletAddress,
          lastLt,
          lastHash
        );

        if (lastTx && lastTx.inMessage) {
          const slice = lastTx.inMessage.body.beginParse();
          const opcode = slice.loadUint(32);
          const txQueryId = slice.loadUintBig(64);

          if (Number(txQueryId) === queryId) {
            clearInterval(interval);
            resolve(lastTx);
          }
        }
        if (refetchLimit && refetches >= refetchLimit) {
          clearInterval(interval);
          resolve(null);
        }
      } catch (error) {
        console.warn('Error while waiting for transaction', error);
      }
    }, refetchInterval);
  });
};
