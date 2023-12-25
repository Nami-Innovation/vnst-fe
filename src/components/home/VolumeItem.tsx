import { useTranslationClient } from '@/i18n/client';
import dayjs from '@/lib/dayjs';
import ExternalIcon from '../common/Icons/ExternalIcon';
import { shortenHexString } from './constant';
import { useState } from 'react';
import clsx from 'clsx';
import { formatGweiNumberStr, formatNumber } from '@/utils/format';
import { getBscAddressLink, getBscScanLink } from '@/utils/helper';
import Link from 'next/link';
type TProps = {
  volume: {
    name: string;
    event: string;
    _id: string;
    status: string;
    difference: number;
    returnValues: {
      0: string;
      1: string;
      2: string;
      3: string;
      market_price: string;
    };
    tokenSymbol: string;
    createdAt: number;
    transactionHash: string;
  };
};

const VolumeItem = ({ volume }: TProps) => {
  const { t } = useTranslationClient();
  const [isHover, setIsHover] = useState(false);
  return (
    <section
      className={clsx(
        'flex min-w-[340px] flex-col items-start justify-start rounded-xxl border border-dark-2 bg-dark-1 p-3 hover:cursor-pointer hover:text-start lg:p-4',
        {
          'hover:shadow-y hover:bg-black-border-gradient':
            volume.event === 'EMint',
          'hover:shadow-y-error hover:bg-black-border-gradient-error':
            volume.event === 'ERedeem',
        }
      )}
      onMouseMove={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <div
        className={clsx(
          'flex-rows flex w-full items-center justify-between border-b border-b-dark-3 pb-2 lg:pb-3',
          {
            'border-b-gradient': isHover === true && volume.event === 'EMint',
            'border-b-gradient-error':
              isHover === true && volume.event === 'ERedeem',
          }
        )}
      >
        <div className='flex w-1/2 flex-col items-start justify-start'>
          <div className='flex-rows flex items-center justify-start gap-x-2'>
            <p className='font-semibold capitalize text-white'>{`${
              volume.event === 'EMint' ? 'Mint' : 'Redeem'
            }`}</p>
            <ul>
              <li
                className={clsx('list-inside list-disc text-xs', {
                  'text-primary': volume.event === 'EMint',
                  'text-danger ': volume.event === 'ERedeem',
                })}
              >
                {formatGweiNumberStr(volume.returnValues.market_price, 2, 6)}
              </li>
            </ul>
          </div>
          <div className='whitespace-nowrap text-xs text-dark-3 hover:text-start'>
            {dayjs
              .unix(Number(volume.returnValues?.[3]))
              .format('HH:mm:ss - DD/MM/YYYY')}
          </div>
        </div>
        <div className='flex flex-1 flex-col items-end justify-start'>
          <div className='w-full whitespace-nowrap break-keep text-end'>
            <span
              className={clsx('break-keep text-sm font-semibold', {
                'text-primary': volume.event === 'EMint',
                'text-danger': volume.event === 'ERedeem',
              })}
            >
              +{formatGweiNumberStr(volume.returnValues?.[2])}{' '}
              {volume?.event === 'ERedeem' ? 'USDT' : 'VNST'}
            </span>
          </div>
          <div className='text-xs text-dark-3'>
            <span>{formatGweiNumberStr(volume.returnValues?.[1])}</span>{' '}
            <span>{volume.event === 'EMint' ? 'USDT' : 'VNST'}</span>
          </div>
        </div>
      </div>
      <div className='flex w-full flex-col gap-y-1 pt-2 text-xs lg:pt-3'>
        <div className='flex w-full items-center justify-between'>
          <p className='text-dark-3'>{t('homepage:address')}</p>
          <div className='flex items-center gap-x-1'>
            <p>{shortenHexString(volume.returnValues?.[0], 6, 4)}</p>
            <Link
              href={getBscAddressLink(volume.returnValues?.[0])}
              target='_blank'
            >
              <ExternalIcon size='12.5' />
            </Link>
          </div>
        </div>
        <div className='flex w-full items-center justify-between'>
          <p className='text-dark-3'>{t('homepage:txh')}</p>
          <div className='flex items-center gap-x-1'>
            <p>{shortenHexString(volume.transactionHash, 6, 4)}</p>
            <Link href={getBscScanLink(volume.transactionHash)} target='_blank'>
              <ExternalIcon size='12.5' />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolumeItem;
