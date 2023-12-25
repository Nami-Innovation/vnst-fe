import ChevronBottomTriangle from '@/components/common/Icons/ChevronBottomTriangle';
import React, { useRef, useState } from 'react';
import { Address } from 'wagmi';
import ClipboardIcon from '@/components/common/Icons/ClipboardIcon';
import { copyToClipboard, getBscAddressLink } from '@/utils/helper';
import ShortAddress from './ShortAddress';
import Button from '@/components/common/Button';
import Popup from '@/components/common/Popup';
import { useTranslationClient } from '@/i18n/client';
import Balances from '../Balances';
import Image from 'next/image';
import Tooltip from '@/components/common/Tooltip';
import useDisconnectWallet from '@/hooks/useDisconnectWallet';

type Props = {
  address?: Address;
};

const Profile = ({ address }: Props) => {
  const { t } = useTranslationClient('common');
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);

  const copyTooltipRef = useRef<any>();

  const popupRef = useRef<any>();
  const { disconnect } = useDisconnectWallet();

  return (
    <>
      <ShortAddress
        afterIcon={<ChevronBottomTriangle />}
        buttonProps={{
          ref: setReferenceElement,
        }}
      />

      <Popup
        ref={popupRef}
        referenceElement={referenceElement}
        className='mt-8 w-72 p-3'
      >
        <ShortAddress
          afterIcon={
            <div className='flex items-center'>
              <button
                className='group mr-1'
                onClick={() => {
                  copyToClipboard(address as string);
                  copyTooltipRef.current?.toggle(true);
                }}
              >
                <Tooltip disabled content={t('copied')} ref={copyTooltipRef}>
                  <ClipboardIcon />
                </Tooltip>
              </button>
              <a target='_blank' href={getBscAddressLink(address as string)}>
                <Image
                  src='/assets/images/scans/bsc-light.png'
                  alt='BSC'
                  width={32}
                  height={32}
                />
              </a>
            </div>
          }
          bgClassName='bg-black'
        />
        {/* <div className="my-3 flex justify-between font-semibold">
          <div>{t("balance")}</div>
          <div className="text-vnst">
            {formatNumber(vnstBalance.data?.formatted) || "0.0"} VNST
          </div>
        </div> */}
        <Balances itemClassname='bg-black' />

        <Button
          size='md'
          variant='secondary'
          className='w-full'
          onClick={() => disconnect()}
        >
          {t('disconnect_wallet')}
        </Button>
      </Popup>
    </>
  );
};

export default Profile;
