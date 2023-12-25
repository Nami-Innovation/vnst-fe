'use client';

import Drawer from '@/components/common/Modal/Drawer';
import React, { useRef, useState } from 'react';
import { useAccount } from 'wagmi';
import ShortAddress from './ConnectWallet/ShortAddress';
import ClipboardIcon from '@/components/common/Icons/ClipboardIcon';
import { copyToClipboard, getBscAddressLink } from '@/utils/helper';
import { Navigations } from '@/configs/navigation';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import Button from '@/components/common/Button';
import ChevronBottomTriangle from '@/components/common/Icons/ChevronBottomTriangle';
import LanguageItem from './LanguageItem';
import Popup from '@/components/common/Popup';
import { useTranslationClient } from '@/i18n/client';
import { languages } from '@/i18n/settings';
import useLang from '@/hooks/useLang';
import Balances from './Balances';
import Image from 'next/image';
import Tooltip from '@/components/common/Tooltip';
import useDisconnectWallet from '@/hooks/useDisconnectWallet';
import { LINK_DIRECT } from '@/components/common/utils/header';
import { LANGUAGE } from '@/utils/type';

const Profile = () => {
  const { isConnected, address } = useAccount();
  const { t } = useTranslationClient('common');
  const copyTooltipRef = useRef<any>();

  if (!isConnected || !address) return null;

  return (
    <>
      <ShortAddress
        afterIcon={
          <div className='flex items-center'>
            <button
              className='group mr-1'
              onClick={() => {
                copyToClipboard(address as string);
                copyTooltipRef.current?.toggle(true);
              }}
            >
              <Tooltip disabled content={t('copied')} ref={copyTooltipRef}>
                <ClipboardIcon />
              </Tooltip>
            </button>
            <a target='_blank' href={getBscAddressLink(address)}>
              <Image
                src='/assets/images/scans/bsc-light.png'
                alt='BSC'
                width={32}
                height={32}
              />
            </a>
          </div>
        }
      />
      <Balances itemClassname='bg-dark-1' />
      <div className='my-6 h-0.5 bg-dark-1' />
    </>
  );
};

const LanguageSelector = () => {
  const popupRef = useRef<any>();
  const lang = useLang();
  const { t } = useTranslationClient('language');

  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (newLang: string) => {
    const newPathName = pathname.replace(`/${lang}`, `/${newLang}`);
    router.replace(newPathName);
  };

  return (
    <>
      <Button size='sm' variant='secondary' ref={setReferenceElement}>
        {t(lang)} <ChevronBottomTriangle className='ml-1' />
      </Button>
      <Popup
        ref={popupRef}
        referenceElement={referenceElement}
        className='mt-2 w-full p-2'
        placement='bottom-end'
      >
        <div className='flex flex-col gap-y-2'>
          {languages.map((locale) => (
            <LanguageItem
              key={locale}
              lang={locale}
              title={t(locale)}
              active={lang === locale}
              onClick={() => changeLanguage(locale)}
            />
          ))}
        </div>
      </Popup>
    </>
  );
};

type Props = {
  isOpen: boolean;
  setIsOpenMobileNav: (isOpen: boolean) => void;
};

const MobileDrawer = ({ isOpen, setIsOpenMobileNav }: Props) => {
  const { lang } = useParams();
  const pathname = usePathname();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnectWallet();
  const { t } = useTranslationClient(['common', 'navigation']);

  return (
    <Drawer isOpen={isOpen} className='px-4 py-6'>
      <Profile />
      <div className='flex flex-col items-end gap-y-4'>
        {Navigations.map((nav) => {
          let localeHref = `/${lang}${nav.href}`;
          if (localeHref.endsWith('/'))
            localeHref = localeHref.slice(0, localeHref.length - 1);
          if (nav.title === 'white-paper')
            localeHref = LINK_DIRECT[lang as keyof LANGUAGE].white_papper;

          const isActive =
            nav.href === pathname || pathname.startsWith(localeHref);
          return (
            <Link
              key={nav.title}
              href={localeHref}
              target={nav.blank ? '_blank' : undefined}
              className={clsx(
                'font-sf-pro-expanded text-lg font-bold',
                isActive && 'text-gradient'
              )}
              onClick={() => setIsOpenMobileNav(false)}
            >
              {t(`navigation:${nav.title}`)}
            </Link>
          );
        })}
      </div>
      <div className='my-6 h-0.5 bg-dark-1' />
      <div className='flex items-center justify-between text-dark-3 '>
        <div>{t(`common:language`)}</div>
        <LanguageSelector />
      </div>
      {isConnected && (
        <Button
          onClick={() => {
            disconnect();
            setIsOpenMobileNav(false);
          }}
          size='md'
          variant='secondary'
          className='mt-6 w-full text-sm text-white'
        >
          {t('common:disconnect_wallet')}
        </Button>
      )}
    </Drawer>
  );
};

export default MobileDrawer;
