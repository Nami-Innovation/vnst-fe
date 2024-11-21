import React, { useRef, useState, useMemo } from 'react';
import ShortAddress from './ShortAddress';
import Balances from './Balances';
import useDisconnectWalletTon from '@/hooks/useDisconnectWalletTon';
import DisconnectIcon from '@/components/common/Icons/DisconnectIcon';
import Drawer from '@/components/common/Modal/Drawer';
import Image from 'next/image';
import { shortenHexString } from '@/components/home/constant';
import { useTonAddress } from '@tonconnect/ui-react';

type Props = {};

const ProfileTon = ({}: Props) => {
  const disconnect = useDisconnectWalletTon();
  const address = useTonAddress(true);

  const shortAddress = useMemo(
    () => shortenHexString(address || '', 5, 4),
    [address]
  );

  const content = useMemo(() => {
    return (
      <div className='space-y-4'>
        <ShortAddress bgClassName='bg-white' isPopup={true} />
        <Balances itemClassname='bg-black' />
        <div className='h-[1px] w-full bg-gray-200' />
        <div className='flex items-center justify-between py-2'>
          <span className='text-sm font-semibold'>Sign out wallet</span>
          <button
            className='mt-1 hover:text-primary'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              disconnect();
            }}
          >
            <DisconnectIcon />
          </button>
        </div>
      </div>
    );
  }, [disconnect]);

  return (
    <Drawer
      trigger={
        <div className='flex items-center gap-x-2 rounded-[6px] border border-solid border-primary bg-primary-dark px-3 py-[7px] text-white hover:cursor-pointer'>
          <Image
            src='/assets/icons/empty-wallet.svg'
            alt='Avata'
            width={16}
            height={16}
          />
          <span className='text-xs font-semibold'>{shortAddress}</span>
        </div>
      }
    >
      {content}
    </Drawer>
  );
};

export default ProfileTon;
