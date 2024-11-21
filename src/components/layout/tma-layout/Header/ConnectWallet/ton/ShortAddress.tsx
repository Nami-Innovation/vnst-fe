import { shortenHexString } from '@/components/home/constant';
import clsx from 'clsx';
import React, { useMemo, useRef } from 'react';
import ExternalLink from '@/components/common/Icons/ExternalLink';
import Tooltip from '@/components/common/Tooltip';
import ClipboardIcon from '@/components/common/Icons/ClipboardIcon';
import { copyToClipboard, getTonScanAddressLink } from '@/utils/helper';
import { useTranslationClient } from '@/i18n/client';
import { useTonAddress, useTonWallet } from '@tonconnect/ui-react';

type Props = {
  afterIcon?: React.ReactNode;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    ref?: React.LegacyRef<HTMLButtonElement>;
  };
  bgClassName?: string;
  isPopup?: boolean;
  isOpen?: boolean;
};

const ShortAddress = ({ buttonProps = {}, isPopup = false }: Props) => {
  const wallet = useTonWallet();
  const address = useTonAddress(true);

  const shortAddress = useMemo(
    () => shortenHexString(address || '', 5, 4),
    [wallet]
  );
  const copyTooltipRef = useRef<any>();
  const { t } = useTranslationClient('common');

  return (
    <>
      {isPopup && (
        <div>
          <div className='flex flex-col items-center gap-y-2'>
            <h1 className='font-sf-pro text-xl font-bold leading-6'>Wallet</h1>
            <div className='item-center flex'>
              <span className='text-sm font-semibold leading-[18px]'>
                {shortAddress}
              </span>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShortAddress;
