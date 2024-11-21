import { shortenHexString } from '@/components/home/constant';
import { WalletLogos } from '@/web3/evm/wallets';
import clsx from 'clsx';
import React, { useMemo, useRef } from 'react';
import { useAccount } from 'wagmi';
import ExternalLink from '@/components/common/Icons/ExternalLink';
import Tooltip from '@/components/common/Tooltip';
import ClipboardIcon from '@/components/common/Icons/ClipboardIcon';
import { copyToClipboard, getBscAddressLink } from '@/utils/helper';
import { useTranslationClient } from '@/i18n/client';

type Props = {
  afterIcon?: React.ReactNode;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    ref?: React.LegacyRef<HTMLButtonElement>;
  };
  bgClassName?: string;
  isPopup?: boolean;
  isOpen?: boolean;
};

const ShortAddress = ({
  afterIcon,
  buttonProps = {},
  isPopup = false,
  isOpen,
  bgClassName = `bg-white ${isOpen ? 'lg:bg-primary' : 'lg:bg-primary-dark'} `,
}: Props) => {
  const { address, connector } = useAccount();
  const shortAddress = useMemo(
    () => shortenHexString(address as string, 5, 4),
    [address]
  );
  const copyTooltipRef = useRef<any>();
  const { t } = useTranslationClient('common');
  return (
    <div
      className={clsx(
        'flex cursor-pointer lg:h-10 lg:w-full',
        isPopup && 'border-b-2 border-gray-200 pb-2'
      )}
    >
      <div
        className={clsx(
          'flex items-center justify-center rounded-s',
          bgClassName,
          isPopup ? 'h-8 w-8' : 'h-10 w-10'
        )}
      >
        {connector ? (
          <div className='relative'>
            <img
              src='/assets/images/avatar.png'
              className={clsx('relative', isPopup ? 'h-8 w-8' : 'h-6 w-6')}
              alt='avatar'
            />
            {isPopup ? (
              <div className='absolute bottom-0 right-0 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white'>
                <img
                  className='h-[13.5px] w-[13.5px]'
                  src={WalletLogos[connector.name]}
                  alt={connector.name}
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <button
        className={clsx(
          'flex flex-1 cursor-pointer items-center justify-between rounded-e px-2',
          bgClassName
        )}
        {...buttonProps}
      >
        <div
          className={clsx(
            'mr-3 flex items-center justify-start gap-x-2 text-sm font-semibold leading-[18px] lg:text-base lg:leading-5',
            isPopup ? 'text-black' : 'text-white'
          )}
        >
          {shortAddress}
          {isPopup ? (
            <div className='flex items-center'>
              <button
                className='group mr-1 text-gray'
                onClick={() => {
                  copyToClipboard(address as string);
                  copyTooltipRef.current?.toggle(true);
                }}
              >
                <Tooltip content={t('common:copy_link')} ref={copyTooltipRef}>
                  <ClipboardIcon className='h-5 w-5' />
                </Tooltip>
              </button>
              <a
                target='_blank'
                href={getBscAddressLink(address as string)}
                className='text-gray hover:text-primary'
              >
                <Tooltip content={t('common:to_bsc')}>
                  <ExternalLink className='h-5 w-5' />
                </Tooltip>
              </a>
            </div>
          ) : null}
        </div>
        <div className='text-gray lg:text-white'>{afterIcon}</div>
      </button>
    </div>
  );
};

export default ShortAddress;
