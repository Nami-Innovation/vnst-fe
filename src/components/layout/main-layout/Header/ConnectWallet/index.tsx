'use client';

import Button from '@/components/common/Button';
import React from 'react';
import Profile from './evm/Profile';
import useAppStore from '@/stores/app.store';
import clsx from 'clsx';
import { useTranslationClient } from '@/i18n/client';
import { useActiveChainConfig } from '@/stores/chain.store';
import { ChainType } from '@/web3/constants';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useAccount } from 'wagmi';
import ProfileTon from './ton/Profile';

const ConnectWallet = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  const { t } = useTranslationClient('common');
  const toggleConnectWalletModal = useAppStore(
    (state) => state.toggleConnectWalletModal
  );
  const chain = useActiveChainConfig();
  const { isConnected } = useAccount();
  const [tonConnectUI] = useTonConnectUI();
  const tonAdress = useTonAddress();

  if (chain.chainType === ChainType.EVM && isConnected) {
    return <Profile />;
  } else if (chain.chainType === ChainType.TON && !!tonAdress) {
    return <ProfileTon />;
  }

  const onClickButton = () => {
    switch (chain.chainType) {
      case ChainType.EVM:
        toggleConnectWalletModal(true);
        break;
      case ChainType.TON:
        tonConnectUI.openModal();
        break;
    }
    onClick?.();
  };

  return (
    <>
      <Button
        onClick={onClickButton}
        size='md'
        variant='primary'
        className={clsx(className, 'hidden lg:flex')}
      >
        {t('connect_wallet')}
      </Button>

      <Button
        onClick={onClickButton}
        size='sm'
        variant='primary'
        className={clsx(className, 'lg:hidden')}
      >
        {t('connect_wallet')}
      </Button>
    </>
  );
};

export default ConnectWallet;
