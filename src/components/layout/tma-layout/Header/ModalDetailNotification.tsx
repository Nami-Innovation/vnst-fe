import { useTranslationClient } from '@/i18n/client';
import clsx from 'clsx';
import { formatNumber } from '@/utils/format';
import TransferIcon from '@/components/common/Icons/TransferIcon';
import dayjs from 'dayjs';
import ExternalIcon from '@/components/common/Icons/ExternalIcon';
import Link from 'next/link';
import { getBscScanLink, getTonScanLink } from '@/utils/helper';
import { useActiveChain } from '@/stores/chain.store';
import { Chain } from '@/web3/constants';
import { NOTIFICATION_TYPE } from '@/types/notification';

type TProps = {
  infoNotification: NOTIFICATION_TYPE;
};

const ModalDetailNotification = ({ infoNotification }: TProps) => {
  const chain = useActiveChain();
  const { t } = useTranslationClient(['mint_redeem', 'common']);
  return (
    <div className='flex flex-col gap-y-5'>
      <div className='flex w-full items-center justify-center'>
        <img
          src='/assets/icons/success_bubble.png'
          alt='Success Icon'
          className='h-[120px] w-[120px] object-cover'
        />
      </div>
      <div className='flex w-full flex-col space-y-1 text-center'>
        <p className='w-full font-semibold text-gray'>
          {t(
            infoNotification?.type === 'mint'
              ? 'common:success_mint'
              : 'common:success_redeem'
          )}
        </p>
        <p
          className={clsx('w-full font-sf-pro-expanded text-xl font-bold', {
            'text-warning': infoNotification.type === 'mint',
            'text-primary': infoNotification.type !== 'mint',
          })}
        >
          {`${formatNumber(infoNotification.metadata.amountOut, 2)} ${
            infoNotification?.type === 'mint' ? 'VNST' : 'USDT'
          } `}
        </p>
        <p className='text-xs font-semibold text-gray'>
          ~{' '}
          {`${formatNumber(infoNotification.metadata.amountIn, 2)} ${
            infoNotification?.type === 'mint' ? 'USDT' : 'VNST'
          }`}
        </p>
      </div>
      <div className='flex flex-col items-start space-y-2 rounded-md bg-gray-300 px-4 py-3 text-xs'>
        <div className='flex w-full items-center justify-between py-0.5'>
          <p className='font-semibold capitalize text-gray'>
            {t('mint_redeem:price')}
          </p>
          <div className='flex items-center justify-end space-x-1'>
            <span className='font-semibold text-gray'>1 USDT</span>
            <p className='text-gray'>
              <TransferIcon />
            </p>
            <p className='font-semibold text-warning'>
              {infoNotification?.type === 'mint'
                ? `${formatNumber(
                    infoNotification.metadata.amountOut /
                      infoNotification.metadata.amountIn,
                    2
                  )} VNST`
                : `${formatNumber(
                    infoNotification.metadata.amountIn /
                      infoNotification.metadata?.amountOut,
                    2
                  )} VNST`}
            </p>
          </div>
        </div>
        <div className='flex w-full items-center justify-between py-0.5'>
          <p className='font-semibold text-gray'>
            {t('mint_redeem:confirm_modal:time')}
          </p>
          <div className='flex items-center justify-end space-x-1'>
            <p className='font-semibold text-gray'>
              {dayjs
                .unix(infoNotification.metadata?.timestamp as number)
                .format('HH:mm:ss - DD/MM/YYYY')}
            </p>
            <Link
              href={
                chain === Chain.TON
                  ? getTonScanLink(
                      infoNotification.metadata?.transactionHash as string
                    )
                  : getBscScanLink(
                      infoNotification.metadata?.transactionHash as string
                    )
              }
              target='_blank'
              className='text-gray'
            >
              <ExternalIcon size='20' color='currentColor' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalDetailNotification;
