import { useIsTablet } from '@/hooks/useMediaQuery';
import Wallets, {
  WalletConfig,
  WalletLogos,
  isWalletBrowserSupported,
} from '@/web3/evm/wallets';
import clsx from 'clsx';
import React from 'react';
import { Connector } from 'wagmi';

type ItemProps = {
  logoUrl: string;
  connector: Connector;
  active?: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

const Item = ({
  logoUrl,
  connector,
  active = false,
  onClick,
  disabled,
  className,
}: ItemProps) => {
  return (
    <button
      className={clsx(
        'flex items-center rounded-md border px-2 py-1',
        active && !disabled
          ? 'bg-primary text-white'
          : 'bg-gray-300 text-gray lg:bg-white',
        disabled
          ? 'order-1 bg-dark-1 opacity-40'
          : 'hover:bg-primary hover:text-white',
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <img src={logoUrl} className='h-8 w-8 p-1' alt={connector.name} />
      <div className='ml-2 text-sm font-semibold leading-[18px] lg:text-base lg:leading-5'>
        {connector.name}
      </div>
    </button>
  );
};

type Props = {
  className?: string;
  active: WalletConfig;
  setActive: (active: WalletConfig) => void;
};

const LeftPanel = ({ className, active, setActive }: Props) => {
  const isTablet = useIsTablet();

  return (
    <div
      className={clsx(
        'flex flex-col gap-y-4 rounded-md p-0 md:bg-gray-300 md:p-4',
        className
      )}
    >
      {Wallets.map((wallet) => (
        <Item
          key={wallet.id}
          active={wallet.id === active.id}
          connector={wallet.connector}
          logoUrl={WalletLogos[wallet.connector.name]}
          onClick={() => setActive(wallet)}
          disabled={
            !isTablet && !wallet.connector.ready && !isWalletBrowserSupported
          }
        />
      ))}
    </div>
  );
};

export default LeftPanel;
