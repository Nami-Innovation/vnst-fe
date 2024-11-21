import { useTranslationClient } from '@/i18n/client';
import dayjs from '@/lib/dayjs';
import ExternalIcon from '../common/Icons/ExternalIcon';
import { shortenHexString } from './constant';
import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

type TProps = {
  type: 'mint' | 'redeem';
  priceRate: string;
  amountIn: string;
  amountOut: string;
  walletAddress: string;
  hash: string;
  time: number; // unix timestamp
  addressLink: string;
  hashLink: string;
};

const VolumeItem = ({
  amountIn,
  amountOut,
  hash,
  priceRate,
  type,
  walletAddress,
  time,
  hashLink,
  addressLink,
}: TProps) => {
  const { t } = useTranslationClient();
  const [isHover, setIsHover] = useState(false);
  return (
    <section
      className={clsx(
        'flex min-w-[340px] flex-col items-start justify-start rounded-xxl border border-gray-200 bg-secondary-lightest p-3 shadow-lg hover:cursor-pointer hover:text-start lg:p-4',
        {
          'hover:border hover:border-primary': type === 'mint',
          'hover:border hover:border-warning': type === 'redeem',
        }
      )}
      onMouseMove={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <div
        className={clsx(
          'flex-rows flex w-full items-center justify-between rounded-lg px-3 pb-2 lg:py-3',
          isHover === true
            ? type === 'mint'
              ? 'bg-gradient-to-r from-primary/20 to-primary/0'
              : 'bg-gradient-to-r from-warning/20 to-warning/0'
            : 'bg-gray-300'
        )}
      >
        <div className='flex w-[60%] flex-col items-start justify-start'>
          <div className='flex-rows flex items-center justify-start gap-x-2'>
            <p
              className={clsx(
                'text-sm font-semibold capitalize leading-[18px] lg:text-base lg:leading-5',
                type === 'mint' ? 'text-primary' : 'text-warning'
              )}
            >{`${type === 'mint' ? 'Mint' : 'Redeem'}`}</p>
            <ul>
              <li
                className={clsx(
                  'list-inside list-disc text-xs font-semibold ',
                  {
                    'maker:text-primary text-primary': type === 'mint',
                    'maker:text-warning text-warning': type === 'redeem',
                  }
                )}
              >
                {priceRate}
              </li>
            </ul>
          </div>
          <div className='whitespace-nowrap text-xs font-semibold text-gray hover:text-start'>
            {dayjs.unix(time).format('HH:mm:ss - DD/MM/YYYY')}
          </div>
        </div>
        <div className='flex flex-1 flex-col items-end justify-start'>
          <div className='w-full whitespace-nowrap break-keep text-end'>
            <span
              className={clsx(
                'break-keep text-sm font-semibold leading-[18px] lg:text-base lg:leading-5',
                {
                  'text-primary': type === 'mint',
                  'text-warning': type === 'redeem',
                }
              )}
            >
              +{amountOut} {type === 'redeem' ? 'USDT' : 'VNST'}
            </span>
          </div>
          <div className='text-xs font-semibold text-gray'>
            <span>{amountIn}</span>{' '}
            <span>{type === 'mint' ? 'USDT' : 'VNST'}</span>
          </div>
        </div>
      </div>
      <div className='flex w-full flex-col gap-y-1 pt-2 text-xs lg:pt-3'>
        <div className='flex w-full items-center justify-between'>
          <p className='font-semibold text-gray'>{t('homepage:address')}</p>
          <div className='flex items-center gap-x-1 font-semibold text-gray'>
            <p>{shortenHexString(walletAddress, 6, 4)}</p>
            <Link href={addressLink} target='_blank'>
              <ExternalIcon size='20' />
            </Link>
          </div>
        </div>
        <div className='flex w-full items-center justify-between'>
          <p className='font-semibold text-gray'>{t('homepage:txh')}</p>
          <div className='flex items-center gap-x-1 font-semibold text-gray'>
            <p>{shortenHexString(hash, 6, 4)}</p>
            <Link href={hashLink} target='_blank'>
              <ExternalIcon size='20' />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolumeItem;
