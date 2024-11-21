import useSwapStore from '@/stores/swap.store';
import React from 'react';
import { FunctionName } from '../types';
import RateInfoUI from './RateInfoUI';

type Props = {
  type: FunctionName;
};

const RateInfo = ({ type }: Props) => {
  const [
    redeemCoveredPrice,
    mintCoveredPrice,
    redeemCoveredAmount,
    mintCoveredAmount,
    redeemFeeRate,
    mintFee,
  ] = useSwapStore((state) => [
    state.redeemCoveredPrice,
    state.mintCoveredPrice,
    state.redeemCoveredAmount,
    state.mintCoveredAmount,
    state.redeemFeeRate,
    state.mintFee,
  ]);

  return (
    <RateInfoUI
      {...{
        type,
        redeemCoveredPrice,
        mintCoveredPrice,
        redeemCoveredAmount,
        mintCoveredAmount,
        redeemFeeRate,
        mintFee,
      }}
    />
  );
};

export default React.memo(RateInfo);
