import { readContracts } from 'wagmi';
import {
  DISABLED_AUTO_CONNECT_KEY,
  RATE_DECIMAL,
  VNST_ADDRESS,
  VNST_DECIMAL,
} from './constants';
import { vnstABI } from './abi';
import { formatUnits } from 'viem';
import { readContract } from '@wagmi/core';

export const disableAutoConnect = () => {
  localStorage.setItem(DISABLED_AUTO_CONNECT_KEY, 'true');
};

export const enableAutoConnect = () => {
  localStorage.removeItem(DISABLED_AUTO_CONNECT_KEY);
};

export const isDisabledAutoConnect = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(DISABLED_AUTO_CONNECT_KEY) === 'true';
};

const contractToken = {
  address: VNST_ADDRESS,
  abi: vnstABI,
};

export const loadContractInfoEVM = async () => {
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
    mintMaxVerifyUser,
    redeemMaxVerifyUser,
    mintFee,
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
      {
        ...contractToken,
        functionName: 'max_mint_limit_verified_user',
      },
      {
        ...contractToken,
        functionName: 'max_redeem_limit_verified_user',
      },
      {
        ...contractToken,
        functionName: 'mint_fee',
      },
    ],
  });

  const contractInfo: Record<string, number> = {};

  if (rCenterResult.status === 'success') {
    contractInfo.marketPrice = Number(
      formatUnits(rCenterResult.result, RATE_DECIMAL)
    );
  }

  if (redeemCoveredPriceResult.status === 'success') {
    contractInfo.redeemCoveredPrice = Number(
      formatUnits(redeemCoveredPriceResult.result, RATE_DECIMAL)
    );
  }

  if (mintCoveredPriceResult.status === 'success') {
    contractInfo.mintCoveredPrice = Number(
      formatUnits(mintCoveredPriceResult.result, RATE_DECIMAL)
    );
  }

  if (redeemCoveredAmountResult.status === 'success') {
    contractInfo.redeemCoveredAmount = Number(
      formatUnits(redeemCoveredAmountResult.result, VNST_DECIMAL)
    );
  }

  if (mintCoveredAmountResult.status === 'success') {
    contractInfo.mintCoveredAmount = Number(
      formatUnits(mintCoveredAmountResult.result, VNST_DECIMAL)
    );
  }

  if (vnstPoolResult.status === 'success') {
    contractInfo.vnstPool = Number(
      formatUnits(vnstPoolResult.result, VNST_DECIMAL)
    );
  }

  if (usdtPoolResult.status === 'success') {
    contractInfo.usdtPool = Number(
      formatUnits(usdtPoolResult.result, VNST_DECIMAL)
    );
  }

  if (redeemFeeResult.status === 'success') {
    contractInfo.redeemFeeRate = Number(
      formatUnits(redeemFeeResult.result, RATE_DECIMAL)
    );
  }

  if (mintLimitMaxResult.status === 'success') {
    contractInfo.mintLimitMax = Number(
      formatUnits(mintLimitMaxResult.result, VNST_DECIMAL)
    );
  }

  if (redeemLimitMaxResult.status === 'success') {
    contractInfo.redeemLimitMax = Number(
      formatUnits(redeemLimitMaxResult.result, VNST_DECIMAL)
    );
  }

  if (mintMaxVerifyUser.status === 'success') {
    contractInfo.mintLimitVerify = Number(
      formatUnits(mintMaxVerifyUser.result, VNST_DECIMAL)
    );
  }

  if (redeemMaxVerifyUser.status === 'success') {
    contractInfo.redeemLimitVerify = Number(
      formatUnits(redeemMaxVerifyUser.result, VNST_DECIMAL)
    );
  }

  if (mintFee.status === 'success') {
    contractInfo.mintFee = Number(formatUnits(mintFee.result, RATE_DECIMAL));
  }

  return contractInfo;
};

export const loadMarketPriceEVM = async () => {
  const marketPrice = await readContract({
    ...contractToken,
    functionName: 'market_price',
  });
  return Number(formatUnits(marketPrice, RATE_DECIMAL));
};
