import Tooltip from '@/components/common/Tooltip';
import { useTranslationClient } from '@/i18n/client';
import { formatNumber } from '@/utils/format';
import { USDT_ADDRESS, VNST_ADDRESS } from '@/web3/evm/constants';
import { WalletLogos } from '@/web3/evm/wallets';
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

  const { t } = useTranslationClient('common');

  return (
    <div
      className={clsx(
        'flex items-center justify-between rounded-md bg-gray-300 py-2 pl-3 pr-1.5',
        className
      )}
    >
      <div className='text-base font-semibold leading-5'>
        {formatNumber(data?.formatted, 3)} {symbol}
      </div>
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
              <Tooltip
                content={t('common:add_to_wallet', { label: connector.name })}
              >
                <img
                  src={WalletLogos[connector.name]}
                  className='h-full w-full'
                  alt='Wallet logo'
                />
              </Tooltip>
            </div>
          )}
        <img src={iconUrl} className='h-8 w-8 rounded-full' alt='Wallet logo' />
      </div>
    </div>
  );
};

const Items = [
  {
    className: 'text-black',
    contractAddress: VNST_ADDRESS,
    iconUrl: '/assets/images/cryptos/vnst.png',
    symbol: 'VNST',
    assetImage: 'https://vnst.io/assets/images/cryptos/vnst.png',
  },
  {
    className: 'text-black',
    contractAddress: USDT_ADDRESS,
    iconUrl: '/assets/images/cryptos/usdt.png',
    symbol: 'USDT',
    assetImage: 'https://tether.to/images/logoMarkGreen.svg',
  },
  {
    className: 'text-black',
    contractAddress: undefined,
    iconUrl: '/assets/images/cryptos/bnb.png',
    symbol: 'BNB',
  },
];

const Balances = ({ itemClassname }: { itemClassname?: string }) => {
  const { address, isConnected, connector } = useAccount();
  if (!isConnected || !address || !connector) return null;

  return (
    <div className='my-3 flex flex-col gap-y-4 lg:gap-y-3'>
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
