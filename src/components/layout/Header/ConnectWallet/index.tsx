'use client';

import Button from '../../../common/Button';
import React from 'react';
import { useAccount } from 'wagmi';
import Profile from './Profile';
import useAppStore from '@/stores/app.store';
import clsx from 'clsx';
import { useIsTablet } from '@/hooks/useMediaQuery';
import { useTranslationClient } from '@/i18n/client';

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
  const isTablet = useIsTablet();
  const { address, isConnected } = useAccount();

  if (isConnected) {
    if (isTablet) return null;
    return <Profile address={address} />;
  }

  const onClickButton = () => {
    toggleConnectWalletModal(true);
    onClick?.();
  };

  return (
    <>
      <Button
        onClick={onClickButton}
        size='md'
        variant='primary'
        className={clsx(className, 'hidden lg:flex ')}
      >
        {t('connect_wallet')}
      </Button>

      <Button
        onClick={onClickButton}
        size='md'
        variant='secondary'
        className={clsx(className, 'flex text-sm !text-white lg:hidden')}
      >
        {t('connect_wallet')}
      </Button>
    </>
  );
};

export default ConnectWallet;
