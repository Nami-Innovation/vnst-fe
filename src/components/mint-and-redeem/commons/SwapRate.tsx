import RefreshIcon from '@/components/common/Icons/RefreshIcon';
import SwapIcon from '@/components/common/Icons/SwapIcon';
import Tooltip from '@/components/common/Tooltip';
import { useTranslationClient } from '@/i18n/client';
import useSwapStore from '@/stores/swap.store';
import { formatNumber } from '@/utils/format';
import { cn } from '@/utils/helper';
import React from 'react';
import { FunctionName } from '../types';
import { useActiveChain } from '@/stores/chain.store';
import { useTonConnect } from '@/hooks/useTonConnect';

const SwapRate = ({
  functionName,
  isTma,
}: {
  functionName: FunctionName;
  isTma?: boolean;
}) => {
  const { t } = useTranslationClient('mint_redeem');
  const activeChain = useActiveChain();
  const { tonClient } = useTonConnect();
  const [rate, loadingSwapInfo, loadSwapInfo] = useSwapStore((state) => [
    state.marketPrice,
    state.loading,
    state.loadContractInfo,
  ]);

  return (
    <div
      className={cn(
        'my-4 flex items-center justify-between text-xs',
        isTma && 'my-3'
      )}
    >
      <span className='font-semibold text-gray'>{t('price')}</span>
      <span className='flex items-center font-semibold'>
        {functionName === 'mint' ? (
          <>
            <span className='font-semibold text-gray'>1 USDT</span>
            <SwapIcon className='mx-1 h-3 w-3 text-gray' />
            <span className='text-warning'>
              {rate ? formatNumber(rate, 3) : ''} VNST
            </span>
          </>
        ) : (
          <>
            <span className='text-warning'>
              {rate ? formatNumber(rate, 3) : ''} VNST
            </span>
            <SwapIcon className='mx-1 h-3 w-3 text-gray' />
            <span className='text-primary'>1 USDT</span>
          </>
        )}

        <Tooltip content={t('refresh_exchange_rate')}>
          <button
            onClick={() => loadSwapInfo(activeChain, tonClient)}
            type='button'
            disabled={loadingSwapInfo}
            className='group ml-1 text-gray outline-none'
          >
            <RefreshIcon
              className={cn(
                'h-5 w-5',
                loadingSwapInfo && 'animate-spin duration-500 animate-reverse'
              )}
            />
          </button>
        </Tooltip>
      </span>
    </div>
  );
};

export default SwapRate;
