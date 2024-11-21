import { formatNumber } from '@/utils/format';
import { useTonAddress } from '@tonconnect/ui-react';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import useJestonWalletData from '@/hooks/useJestonWallet';
import { JETTON_CONFIGS } from '@/web3/ton/constants';
import useTonBalance from '@/hooks/useTonBalance';

type BalanceItemProps = {
  className?: string;
  iconUrl: string;
  symbol: string;
};

const BalanceItem = ({ className, iconUrl, symbol }: BalanceItemProps) => {
  const { formattedBalance, isFetching, refetch } =
    symbol === 'TON'
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        useTonBalance()
      : // eslint-disable-next-line react-hooks/rules-of-hooks
        useJestonWalletData(symbol as keyof typeof JETTON_CONFIGS);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div
      className={clsx(
        'flex items-center justify-between rounded-md bg-gray-300 py-2 pl-3 pr-1.5',
        className
      )}
    >
      <div className='text-sm font-semibold leading-[18px]'>
        {isFetching && !formattedBalance
          ? '-'
          : formatNumber(formattedBalance, 3)}{' '}
        {symbol}
      </div>
      <div className='flex items-center'>
        <img src={iconUrl} className='h-8 w-8 rounded-full' alt='Wallet logo' />
      </div>
    </div>
  );
};

const Items = [
  {
    symbol: 'VNST',
    className: 'text-black',
    iconUrl: '/assets/images/cryptos/vnst.png',
  },
  {
    symbol: 'USDT',
    className: 'text-black',
    iconUrl: '/assets/images/cryptos/usdt.png',
  },
  {
    symbol: 'TON',
    iconUrl: '/assets/images/cryptos/ton.png',
  },
];

const Balances = React.memo(({ itemClassname }: { itemClassname?: string }) => {
  const tonAdress = useTonAddress();
  if (!tonAdress) return null;

  return (
    <div className='flex flex-col gap-y-2'>
      {Items.map((item) => (
        <BalanceItem
          key={item.symbol}
          className={clsx(item.className, itemClassname)}
          iconUrl={item.iconUrl}
          symbol={item.symbol}
        />
      ))}
    </div>
  );
});

export default Balances;
