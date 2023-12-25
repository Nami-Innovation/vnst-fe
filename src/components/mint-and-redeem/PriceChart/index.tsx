'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import ChartHeader from './ChartHeader';
import ExchangeIcon from '@/components/common/Icons/ExchangeIcon';
import usePriceChartStore from '@/stores/price-chart.store';
import clsx from 'clsx';

const Chart = dynamic(() => import('./Chart'), { ssr: false });

const PriceChart = () => {
  const [inverted, toggleInverted] = usePriceChartStore((state) => [
    state.inverted,
    state.toggleInverted,
  ]);
  return (
    <>
      <div className='flex items-center rounded-t-xxl bg-dark-1 px-4 py-4 md:px-5'>
        <div className={clsx('flex gap-1', inverted && 'flex-row-reverse')}>
          <img src='/assets/images/cryptos/usdt.png' className='h-8 w-8' />
          <img src='/assets/images/cryptos/vnst.png' className='h-8 w-8' />
        </div>
        <div className='mx-2 font-semibold text-dark-4'>
          {inverted ? 'VNST/USDT' : 'USDT/VNST'}
        </div>
        <button className='text-dark-4' onClick={() => toggleInverted()}>
          <ExchangeIcon className='h-5 w-5' />
        </button>
      </div>
      <div className='price-chart mt-[1px] rounded-b-xxl bg-dark-1 py-4 md:py-5'>
        <ChartHeader />
        <Chart />
      </div>
    </>
  );
};

export default PriceChart;
