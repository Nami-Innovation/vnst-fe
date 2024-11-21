'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Modal from '../common/Modal';
import { useConnect, useAccount } from 'wagmi';
import Wallets, {
  WalletConfig,
  WalletIds,
  WalletLogos,
} from '@/web3/evm/wallets';
import useAppStore from '@/stores/app.store';
import { signMessage, switchNetwork } from '@wagmi/core';
import { UserRejectedRequestError, hashMessage } from 'viem';
import { getNonce, login } from '@/services/auth.api';
import useWalletStore from '@/stores/wallet.store';
import LeftPanel from './LeftPanel';
import Button from '../common/Button';
import { useTranslationClient } from '@/i18n/client';
import { usePathname, useSearchParams } from 'next/navigation';
import { mainChain } from '@/web3/evm/wagmiConfig';
import { toast } from 'react-toastify';
import { enableAutoConnect } from '@/web3/evm/utils';
import useDisconnectWallet from '@/hooks/useDisconnectWallet';
import { LANGUAGE, LINK_DIRECT } from '../common/utils/header';
import useLang from '@/hooks/useLang';
import nl2br from 'react-nl2br';
import Drawer from '../common/Modal/Drawer';
import { useIsTablet } from '@/hooks/useMediaQuery';

const autoConnectWalletIdKey = 'wallet_id';

const ConnectWalletModal = () => {
  const searchParams = useSearchParams();
  const lang = useLang();
  const autoConnectWalletId = searchParams.get(autoConnectWalletIdKey);
  const isTablet = useIsTablet();
  const { t } = useTranslationClient('common');
  const [active, setActive] = useState<WalletConfig>(() => {
    let wallet: WalletConfig | undefined;
    if (autoConnectWalletId) {
      wallet = Wallets.find((w) => w.id === autoConnectWalletId);
    }
    if (!wallet) {
      wallet = Wallets.find((wallet) => !!wallet.connector.ready);
    }
    return wallet || Wallets[0];
  });
  const pathname = usePathname();

  const { isOpenConnectWallet, toggleConnectWalletModal } = useAppStore();
  const [setWallet, setAccessToken, setIsLogging] = useWalletStore((state) => [
    state.setWallet,
    state.setAccessToken,
    state.setIsLogging,
  ]);
  const { connectAsync } = useConnect();
  const { isConnected } = useAccount();
  const disconnect = useDisconnectWallet();
  const closeModal = () => toggleConnectWalletModal(false);

  const onConnect = async (wallet: WalletConfig, isMobile = false) => {
    const { id, connector } = wallet;
    if (isMobile && (!connector.ready || id === WalletIds.Coinbase)) {
      const url =
        window.location.origin +
        window.location.pathname +
        `?${autoConnectWalletIdKey}=${WalletIds.Coinbase}`;
      switch (id) {
        case WalletIds.Metamask:
          return window.open(
            `https://metamask.app.link/dapp/${window.location.host}${pathname}?${autoConnectWalletIdKey}=${WalletIds.Metamask}`
          );
        case WalletIds.Coinbase:
          return window.open(
            `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(url)}`
          );
        case WalletIds.TrustWallet:
          return window.open(
            `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(
              url
            )}`
          );
        case WalletIds.C98:
          return window.open(
            `https://coin98.com/dapp/${encodeURIComponent(url)}/${mainChain.id}`
          );
        default:
          break;
      }
    }

    setIsLogging(true);
    try {
      const result = await connectAsync({ connector });
      const nonce = await getNonce(result.account);
      if (result.chain.unsupported) {
        await switchNetwork({ chainId: mainChain.id });
      }

      const signature = await signMessage({
        message: hashMessage(nonce),
      });
      const data = await login({
        walletAddress: result.account,
        signature,
      });

      setWallet(data.wallet);
      setAccessToken(data.accessToken);
      toast.success(t('common:connect_success'));
      enableAutoConnect();
      if (result.account) closeModal();
    } catch (error) {
      disconnect();
      let message = 'common:connect_error.default';
      if (error instanceof UserRejectedRequestError) {
        if (error.code === 4001) {
          message = 'common:connect_error.user_rejected';
        }
      }
      toast.error(t(message));
      console.error('Connect error: ', error);
    }
    setIsLogging(false);
  };

  useEffect(() => {
    if (autoConnectWalletId) {
      window.history.replaceState(history.state, '', pathname);
    }
    if (isConnected || !autoConnectWalletId) return;
    const wallet = Wallets.find((wallet) => wallet.id === autoConnectWalletId);
    if (wallet) {
      onConnect(wallet);
    }
  }, []);
  const content = useMemo(() => {
    return (
      <div className='grid grid-cols-12 gap-x-5'>
        <LeftPanel
          setActive={setActive}
          active={active}
          className='col-span-12 md:col-span-5'
        />

        <Button
          onClick={() => onConnect(active, true)}
          size='md'
          variant='primary'
          className='col-span-12 mt-6 block md:hidden'
        >
          {t('connect_wallet')}
        </Button>

        <div className='col-span-7 hidden flex-col items-center justify-center rounded-md bg-gray-300 p-4 md:flex'>
          {active.connector.ready ? (
            <>
              <img
                src={WalletLogos[active.connector.name]}
                alt={active.connector.name}
                className='h-[51px] w-[51px] p-[8.5]'
              />
              <div className='text-base font-semibold leading-5 text-black'>
                {active.connector.name}
              </div>

              <Button
                onClick={() => onConnect(active, false)}
                size='md'
                variant='primary'
                className='my-4 lg:w-40'
              >
                {t('connect_wallet')}
              </Button>
              <div className='text-xs font-semibold leading-4 text-gray'>
                {t('common:dont_wallet_extension')}
              </div>
              <a
                target='_blank'
                href={LINK_DIRECT[lang as keyof LANGUAGE]?.learn_add_wallet}
                className='mt-1 text-xs font-semibold leading-4 text-primary'
              >
                {t('common:learn_add_wallet')}
              </a>
            </>
          ) : (
            <>
              <img
                src={WalletLogos[active.connector.name]}
                alt={active.connector.name}
                className='h-[51px] w-[51px] p-[8.5]'
              />
              <div className='font-semibold text-black'>
                {t('common:install_wallet', {
                  wallet: active.connector.name,
                })}
              </div>
              <div className='mt-2 text-center text-xs font-semibold leading-4 text-gray'>
                {nl2br(
                  t('common:add_extension_content', {
                    wallet: active.connector.name,
                  })
                )}
              </div>
              <Button
                onClick={() => window.open(active.installHref)}
                size='md'
                variant='primary'
                className='my-4 w-20'
              >
                {t('common:btn:install')}
              </Button>
              <a
                target='_blank'
                href={LINK_DIRECT[lang as keyof LANGUAGE]?.learn_add_wallet}
                className='text-xs font-semibold leading-4 text-primary'
              >
                {t('common:how_to_install', { wallet: active.connector.name })}
              </a>
            </>
          )}
        </div>
      </div>
    );
  }, [lang, active, t]);
  if (isTablet) {
    return (
      <Drawer
        title={
          <div className='font-sf-pro-expanded text-lg font-bold leading-[22px] text-black'>
            {t('connect_wallet')}
          </div>
        }
        trigger={<div className='hidden'></div>}
        open={isOpenConnectWallet}
        onOpenChange={(open) => toggleConnectWalletModal(open)}
      >
        {content}
      </Drawer>
    );
  }
  return (
    <Modal
      isOpen={isOpenConnectWallet}
      shouldCloseOnOverlayClick={true}
      isMobileFullHeight
      onRequestClose={closeModal}
      className='max-w-2xl !bg-white'
      overlayClassName='z-0 lg:z-10'
      title={t('connect_wallet')}
    >
      {content}
    </Modal>
  );
};

export default ConnectWalletModal;
