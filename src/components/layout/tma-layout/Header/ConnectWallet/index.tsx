'use client';

import React from 'react';
import clsx from 'clsx';
import { useTranslationClient } from '@/i18n/client';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import ProfileTon from './ton/Profile';
import Button from '@/components/common/Button';

const ConnectWallet = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  const { t } = useTranslationClient('common');
  const [tonConnectUI] = useTonConnectUI();
  const tonAdress = useTonAddress();

  if (!!tonAdress) {
    return <ProfileTon />;
  }

  const onClickButton = () => {
    tonConnectUI.openModal();
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
