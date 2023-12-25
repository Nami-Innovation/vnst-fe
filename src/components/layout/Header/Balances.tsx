import { formatNumber } from '@/utils/format';
import { USDT_ADDRESS, VNST_ADDRESS } from '@/web3/constants';
import { WalletLogos } from '@/web3/wallets';
import clsx from 'clsx';
import React from 'react';
import { Address, Connector, useAccount, useBalance } from 'wagmi';

type BalanceItemProps = {
  className?: string;
  contractAddress?: string;
  address: string;
  iconUrl: string;
  connector: Connector;
  symbol: string;
  assetImage?: string;
};

const BalanceItem = ({
  className,
  address,
  contractAddress,
  iconUrl,
  connector,
  symbol,
  assetImage,
}: BalanceItemProps) => {
  const { data } = useBalance({
    address: address as Address,
    token: contractAddress as Address,
  });

  return (
    <div
      className={clsx(
        'flex items-center justify-between rounded-md py-2 pl-3 pr-1.5',
        className
      )}
    >
      <div className='text-semibold'>{formatNumber(data?.formatted, 3)}</div>
      <div className='flex items-center'>
        {contractAddress &&
          !!connector.watchAsset &&
          WalletLogos[connector.name] && (
            <div
              className='mr-1 h-6 w-6 cursor-pointer p-0.5'
              onClick={() =>
                connector.watchAsset?.({
                  address: contractAddress,
                  symbol,
                  decimals: 18,
                  image: assetImage,
                })
              }
            >
              <img
                src={WalletLogos[connector.name]}
                className='w-full'
                alt='Wallet logo'
              />
            </div>
          )}
        <img src={iconUrl} className='h-8 w-8 rounded-full' alt='Wallet logo' />
      </div>
    </div>
  );
};

const Items = [
  {
    className: 'text-vnst',
    contractAddress: VNST_ADDRESS,
    iconUrl: '/assets/images/cryptos/vnst.png',
    symbol: 'VNST',
    assetImage: 'https://vnst.io/assets/images/cryptos/vnst.png',
  },
  {
    className: 'text-primary',
    contractAddress: USDT_ADDRESS,
    iconUrl: '/assets/images/cryptos/usdt.png',
    symbol: 'USDT',
    assetImage: 'https://tether.to/images/logoMarkGreen.svg',
  },
  {
    className: 'text-vnst',
    contractAddress: undefined,
    iconUrl: '/assets/images/cryptos/bnb.png',
    symbol: 'BNB',
  },
];

const Balances = ({ itemClassname }: { itemClassname?: string }) => {
  const { address, isConnected, connector } = useAccount();
  if (!isConnected || !address || !connector) return null;

  return (
    <div className='my-3 flex flex-col gap-y-3'>
      {Items.map((item) => (
        <BalanceItem
          key={item.symbol}
          className={clsx(item.className, itemClassname)}
          contractAddress={item.contractAddress}
          address={address}
          iconUrl={item.iconUrl}
          connector={connector}
          symbol={item.symbol}
          assetImage={item.assetImage}
        />
      ))}
    </div>
  );
};

export default Balances;
