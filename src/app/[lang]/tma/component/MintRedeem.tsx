'use client';

import React, { useEffect, useState } from 'react';
import Tabs from '@/components/mint-and-redeem/Tabs';
import { FunctionName } from '@/components/mint-and-redeem/types';
import '@/styles/mint-redeem.scss';
import dynamic from 'next/dynamic';
import usePriceChartStore from '@/stores/price-chart.store';
const SwapTON = dynamic(() => import('@/components/mint-and-redeem/SwapTON'), {
  ssr: false,
});

const MintRedeem = () => {
  const [toggleInverted] = usePriceChartStore((state) => [
    state.toggleInverted,
  ]);
  const [active, setActive] = useState<FunctionName>('mint');

  useEffect(() => {
    toggleInverted(active === 'redeem');
  }, [active, toggleInverted]);

  const toggleActive = () => {
    setActive((active) => (active === 'mint' ? 'redeem' : 'mint'));
  };

  return (
    <div className='mx-auto pb-11'>
      <Tabs active={active} onChange={setActive} />
      <SwapTON active={active} toggleActive={toggleActive} isTma={true} />
    </div>
  );
};

export default MintRedeem;
