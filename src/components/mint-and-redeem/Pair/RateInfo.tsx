import QuestionMarkIcon from '@/components/common/Icons/QuestionMarkIcon';
import Tooltip from '@/components/common/Tooltip';
import useSwapStore from '@/stores/swap.store';
import { formatNumber } from '@/utils/format';
import React from 'react';
import { FunctionName } from '../types';
import { useTranslationClient } from '@/i18n/client';
import nl2br from 'react-nl2br';

type Props = {
  type: FunctionName;
};

const RateInfo = ({ type }: Props) => {
  const { t } = useTranslationClient('mint_redeem');
  const [
    redeemCoveredPrice,
    mintCoveredPrice,
    redeemCoveredAmount,
    mintCoveredAmount,
    redeemFeeRate,
  ] = useSwapStore((state) => [
    state.redeemCoveredPrice,
    state.mintCoveredPrice,
    state.redeemCoveredAmount,
    state.mintCoveredAmount,
    state.redeemFeeRate,
  ]);

  const renderQSupport = () => {
    if (type === 'mint') {
      if (mintCoveredAmount)
        return `${formatNumber(mintCoveredAmount, 3)} VNST`;
    } else {
      return formatNumber(redeemCoveredAmount, 3) + ' USDT';
    }
    return null;
  };

  return (
    <>
      {/* Q-Support */}
      <div className='flex justify-between'>
        <div className='flex  items-center text-dark-3'>
          <span>{t(`${type}.covered_amount`)}</span>
          <Tooltip
            className='ml-2'
            content={nl2br(t(`${type}.covered_amount_tooltip`))}
          >
            <QuestionMarkIcon className='inline' />
          </Tooltip>
        </div>
        <span>{renderQSupport()}</span>
      </div>

      {/* R-Support */}
      <div className='mt-4 flex justify-between'>
        <div className='flex items-center text-dark-3'>
          <span>{t(`${type}.covered_price`)}</span>
          <Tooltip
            className='ml-2'
            content={nl2br(t(`${type}.covered_price_tooltip`))}
          >
            <QuestionMarkIcon className='inline' />
          </Tooltip>
        </div>
        <span>
          {type === 'mint'
            ? formatNumber(mintCoveredPrice)
            : formatNumber(redeemCoveredPrice)}{' '}
          VNST
        </span>
      </div>

      {/* Trading Fee */}
      {type === 'redeem' && (
        <div className='mt-4 flex justify-between'>
          <div className='flex w-24 items-center justify-between text-dark-3'>
            <span>{t('redeem.fee')}</span>
            <Tooltip content={t('redeem.fee_tooltip')}>
              <QuestionMarkIcon className='inline' />
            </Tooltip>
          </div>
          <span>{redeemFeeRate * 100}%</span>
        </div>
      )}
    </>
  );
};

export default React.memo(RateInfo);
