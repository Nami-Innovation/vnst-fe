import { shortenHexString } from '@/components/home/constant';
import { WalletLogos } from '@/web3/wallets';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { useAccount, useNetwork } from 'wagmi';

type Props = {
  afterIcon?: React.ReactNode;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    ref?: React.LegacyRef<HTMLButtonElement>;
  };
  bgClassName?: string;
};

const ShortAddress = ({
  afterIcon,
  buttonProps = {},
  bgClassName = 'bg-dark-1',
}: Props) => {
  const { chain } = useNetwork();
  const { address, connector } = useAccount();
  const shortAddress = useMemo(
    () => shortenHexString(address as string, 5, 4),
    [address]
  );

  return (
    <div className='flex'>
      <div
        className={clsx(
          'mr-[1px] flex h-10 w-10 items-center justify-center rounded-s',
          bgClassName
        )}
      >
        {connector ? (
          <img
            className='h-6 w-6'
            src={WalletLogos[connector.name]}
            alt={connector.name}
          />
        ) : null}
      </div>
      <button
        className={clsx(
          'flex flex-1 cursor-pointer items-center justify-between rounded-e px-2',
          bgClassName
        )}
        {...buttonProps}
      >
        <div className='mr-3 text-sm font-semibold leading-6'>
          {shortAddress}
        </div>
        <div className='text-dark-3'>{afterIcon}</div>
      </button>
    </div>
  );
};

export default ShortAddress;
