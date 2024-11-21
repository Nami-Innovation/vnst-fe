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
    <div className=''>
      <div className='flex items-center border-b border-gray-200 px-4 py-3 md:px-5'>
        <div className={clsx('flex gap-1', inverted && 'flex-row-reverse')}>
          <img src='/assets/images/cryptos/usdt.png' className='h-8 w-8' />
          <img src='/assets/images/cryptos/vnst.png' className='h-8 w-8' />
        </div>
        <div className='mx-2 font-semibold leading-5 text-gray'>
          {inverted ? 'VNST/USDT' : 'USDT/VNST'}
        </div>
        <button
          className='text-gray hover:text-primary'
          onClick={() => toggleInverted()}
        >
          <ExchangeIcon className='h-5 w-5' />
        </button>
      </div>
      <div className='price-chart flex flex-col md:gap-y-6 py-4 pt-3 md:pb-5'>
        <ChartHeader />
        <Chart />
      </div>
    </div>
  );
};

export default PriceChart;
