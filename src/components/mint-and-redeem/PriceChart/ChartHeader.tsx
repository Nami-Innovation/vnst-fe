'use client';
import Button from '@/components/common/Button';
import usePriceChartStore from '@/stores/price-chart.store';
import useSwapStore from '@/stores/swap.store';
import { formatNumber } from '@/utils/format';
import clsx from 'clsx';
import dayjs from '@/lib/dayjs';
import React, { useEffect, useMemo } from 'react';
import useLang from '@/hooks/useLang';

const RangeButtons = [
  {
    title: '24H',
    value: 'd',
  },
  {
    title: '1W',
    value: 'w',
  },
  {
    title: '1M',
    value: 'm',
  },
  {
    title: '1Y',
    value: 'y',
  },
];

const ChartHeader = () => {
  const lang = useLang();
  const [
    data,
    currentTime,
    dataPointIndex,
    fetchData,
    range,
    setRange,
    inverted,
  ] = usePriceChartStore((state) => [
    state.data,
    state.currentTime,
    state.dataPointIndex,
    state.fetchData,
    state.range,
    state.setRange,
    state.inverted,
  ]);

  const marketPrice = useSwapStore((state) => state.marketPrice);
  let firstPrice = data[0]?.price;

  useEffect(() => {
    fetchData('usdt', range);
  }, [range]);

  let { price, time } = useMemo(() => {
    let price = marketPrice;
    let time = currentTime;
    if (
      dataPointIndex >= 0 &&
      data.length > 0 &&
      dataPointIndex < data.length
    ) {
      const item = data[dataPointIndex];
      if (!!item) {
        price = item.price;
        time = dayjs(item.timestamp);
      }
    }

    return {
      time: time.locale(lang).format('lll'),
      price,
    };
  }, [data, dataPointIndex, currentTime, marketPrice, lang]);
  let diff = 0;

  if (price && firstPrice) {
    if (inverted) {
      price = 1 / price;
      firstPrice = 1 / firstPrice;
    }
    diff = price - firstPrice;
  }

  return (
    <div className='flex flex-wrap items-start justify-between gap-x-2 gap-y-5 px-4 md:px-5'>
      <div>
        {price && price > 0 && (
          <>
            <div className='flex items-baseline gap-x-2'>
              <div className='font-sf-pro-expanded text-2xl font-bold md:text-[30px]'>
                {formatNumber(price, inverted ? 7 : 2)}
              </div>
              <div className='text-xs text-dark-4'>
                {inverted ? 'VNST/USDT' : 'USDT/VNST'}
              </div>
              {firstPrice && (
                <div
                  className={clsx(
                    'text-xs',
                    diff >= 0 ? 'text-primary' : 'text-danger'
                  )}
                >
                  {`${diff >= 0 ? '+' : '-'}${formatNumber(
                    Math.abs(diff),
                    inverted ? 8 : 3
                  )}`}{' '}
                  ({((Math.abs(diff) / firstPrice) * 100).toFixed(2)}%)
                </div>
              )}
            </div>
            <div className='mt-2 text-xs text-dark-4'>{time}</div>
          </>
        )}
      </div>
      <div className='flex gap-3 md:mt-1'>
        {RangeButtons.map(({ value, title }) => (
          <Button
            key={value}
            size='sm'
            variant={range === value ? 'primary' : 'secondary'}
            onClick={() => setRange(value)}
            className='!px-3'
          >
            {title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ChartHeader;
