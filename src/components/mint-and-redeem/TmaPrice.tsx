import useLang from '@/hooks/useLang';
import { useActiveChain } from '@/stores/chain.store';
import usePriceChartStore from '@/stores/price-chart.store';
import useSwapStore from '@/stores/swap.store';
import { formatNumber } from '@/utils/format';
import { cn } from '@/utils/helper';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';

type Props = {
  type: 'mint' | 'redeem';
};

export default function TmaPrice({ type }: Props) {
  const lang = useLang();
  const chain = useActiveChain();
  const [data, currentTime, dataPointIndex, inverted, fetchData, range] =
    usePriceChartStore((state) => [
      state.data,
      state.currentTime,
      state.dataPointIndex,
      state.inverted,
      state.fetchData,
      state.range,
    ]);
  let diff = 0;

  useEffect(() => {
    fetchData('usdt', range, chain);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, chain]);

  const marketPrice = useSwapStore((state) => state.marketPrice);
  let firstPrice = data[0]?.price;
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
      time: `${time.locale(lang).format('MMM D, YYYY h:mm A')} (UTC)`,
      price,
    };
  }, [data, dataPointIndex, currentTime, marketPrice, lang]);

  if (price && firstPrice) {
    if (inverted) {
      price = 1 / price;
      firstPrice = 1 / firstPrice;
    }
    diff = price - firstPrice;
  }

  return (
    <>
      {price && price > 0 && (
        <div className='space-x-1'>
          <div className='font-sf-pro-expanded text-base font-semibold'>
            {type === 'mint'
              ? `1 USDT = ${formatNumber(price, 2)} VNST`
              : `1 VNST = ${formatNumber(price, 7)} USDT`}
          </div>
          {
            <div className='flex items-center gap-x-1 font-semibold'>
              {firstPrice && (
                <span
                  className={cn(
                    'text-xs',
                    diff >= 0 ? 'text-primary' : 'text-error-100'
                  )}
                >
                  {`${diff >= 0 ? '+' : '-'}${((Math.abs(diff) / firstPrice) * 100).toFixed(2)}%`}
                </span>
              )}
              <span className='text-[10px] text-dark-4'>{time}</span>
            </div>
          }
        </div>
      )}
    </>
  );
}
