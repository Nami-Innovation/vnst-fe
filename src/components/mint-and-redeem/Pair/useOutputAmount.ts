import useSwapStore from '@/stores/swap.store';
import { useMemo } from 'react';
import { FunctionName } from '../types';

const useOutputAmount = (amount: number, type: FunctionName) => {
  const deps = useSwapStore((state) => [
    state.marketPrice,
    state.redeemCoveredPrice,
    state.mintCoveredPrice,
    state.vnstPool,
    state.usdtPool,
  ]);

  const [
    marketPrice = 0,
    redeemCoveredPrice = 0,
    mintCoveredPrice = 0,
    vnstPool = 0,
    usdtPool = 0,
  ] = deps;
  const k = usdtPool * vnstPool;

  const _getUSDTInBeforeSupport = () => {
    return Math.sqrt(k / mintCoveredPrice) - usdtPool;
  };

  const _getVNSTInBeforeSupport = () => {
    return Math.sqrt(k * redeemCoveredPrice) - vnstPool;
  };

  const _getAmountVNSTOut = (amountUsdt: number) => {
    return (vnstPool * amountUsdt) / (amountUsdt + usdtPool);
  };

  function _getAmountUSDTOut(amountVnst: number) {
    return (usdtPool * amountVnst) / (amountVnst + vnstPool);
  }
  const amountOut = useMemo(() => {
    if (!marketPrice || !redeemCoveredPrice || !mintCoveredPrice || !amount)
      return 0;

    if (type === 'mint') {
      const amountUsdtInBeforeSupport = _getUSDTInBeforeSupport();

      // Case mint don't hit r support
      if (amount <= amountUsdtInBeforeSupport) {
        return _getAmountVNSTOut(amount);
      } else {
        const amountOutBeforeSupport = _getAmountVNSTOut(
          amountUsdtInBeforeSupport
        );

        const amountOutSupport =
          (amount - amountUsdtInBeforeSupport) * mintCoveredPrice;
        //   TODO: Check amount out support max
        return amountOutSupport + amountOutBeforeSupport;
      }
    } else {
      const amountVnstInBeforeSupport = _getVNSTInBeforeSupport();

      if (amount <= amountVnstInBeforeSupport) {
        const amountOut = _getAmountUSDTOut(amount);
        // - Q-Out dự kiến hiển thị cho người dùng không trừ fee
        // const redeemFee = amountOut * redeemFeeRate;
        return amountOut;
      } else {
        const amountOutBeforeSupport = _getAmountUSDTOut(
          amountVnstInBeforeSupport
        );

        const amountOutSupport =
          (amount - amountVnstInBeforeSupport) / redeemCoveredPrice;
        const amountOut = amountOutSupport + amountOutBeforeSupport;
        // - Q-Out dự kiến hiển thị cho người dùng không trừ fee
        // const redeemFee = amountOut * redeemFeeRate;
        return amountOut;
      }
    }
  }, [...deps, amount, type]);

  return amountOut;
};

export default useOutputAmount;
