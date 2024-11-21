import QuestionMarkIcon from '@/components/common/Icons/QuestionMarkIcon';
import Tooltip from '@/components/common/Tooltip';
import { formatNumber } from '@/utils/format';
import React from 'react';
import { FunctionName } from '../types';
import { useTranslationClient } from '@/i18n/client';
import nl2br from 'react-nl2br';

type Props = {
  type: FunctionName;
  redeemCoveredPrice?: number;
  mintCoveredPrice?: number;
  redeemCoveredAmount?: number;
  mintCoveredAmount?: number;
  redeemFeeRate: number;
  mintFee: number;
};

const RateInfoUI = ({
  type,
  redeemCoveredPrice,
  mintCoveredPrice,
  redeemCoveredAmount,
  mintCoveredAmount,
  redeemFeeRate,
  mintFee,
}: Props) => {
  const { t } = useTranslationClient('mint_redeem');

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
    <div className='flex flex-col gap-y-2 lg:gap-y-2.5'>
      {/* Q-Support */}
      <div className='flex justify-between'>
        <div>
          <Tooltip
            className='flex items-center text-xs font-semibold text-gray hover:text-primary'
            content={nl2br(t(`${type}.covered_amount_tooltip`))}
          >
            <span>{t(`${type}.covered_amount`)}</span>{' '}
            <QuestionMarkIcon className='ml-2 inline' />
          </Tooltip>
        </div>
        <span className='text-xs font-semibold leading-4 text-black'>
          {renderQSupport()}
        </span>
      </div>

      {/* R-Support */}
      <div className='flex justify-between'>
        <div className='flex items-center text-xs font-semibold text-gray'>
          <Tooltip
            className='flex items-center text-xs font-semibold text-gray hover:text-primary'
            content={nl2br(t(`${type}.covered_price_tooltip`))}
          >
            <span>{t(`${type}.covered_price`)}</span>{' '}
            <QuestionMarkIcon className='ml-2 inline' />
          </Tooltip>
        </div>
        <span className='text-xs font-semibold leading-4 text-black'>
          {type === 'mint'
            ? formatNumber(mintCoveredPrice)
            : formatNumber(redeemCoveredPrice)}{' '}
          VNST
        </span>
      </div>

      {/* Trading Fee */}

      <div className='flex justify-between'>
        <div>
          <Tooltip
            content={t(`${type}.fee_tooltip`)}
            className='flex items-center text-xs font-semibold text-gray hover:text-primary'
          >
            <span>{t(`${type}.fee`)}</span>{' '}
            <QuestionMarkIcon className='ml-2 inline' />
          </Tooltip>
        </div>
        <span className='text-xs font-semibold leading-4 text-black'>
          {type === 'mint' ? mintFee * 100 : redeemFeeRate * 100} %
        </span>
      </div>
    </div>
  );
};

export default React.memo(RateInfoUI);
