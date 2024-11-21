'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navigation from './navigations/Navigation';
import LanguageSelector from './LanguageSelector';
import { useIsTablet } from '@/hooks/useMediaQuery';
import useLang from '@/hooks/useLang';
import LogoIcons from '@/components/common/Icons/LogoIcon';
import SelectChain from './SelectChain';

const ConnectWallet = dynamic(() => import('./ConnectWallet'), {
  ssr: false,
});
const Notification = dynamic(() => import('./Notification'), {
  ssr: false,
});
const MobileDrawer = dynamic(() => import('./MobileDrawer'), {
  ssr: false,
});

const Header = () => {
  const isTablet = useIsTablet();
  const lang = useLang();
  return (
    <>
      <header className='fixed top-[-2px] z-10 h-[60px] w-full bg-secondary-darkest px-4 pt-[2px] lg:relative  lg:top-auto lg:h-[66px] lg:pt-0 xl:px-0'>
        <div className='mx-auto flex h-full items-center justify-between lg:max-w-screen-xl'>
          <div className='flex items-center gap-x-2 lg:mr-16'>
            <Link href={`/${lang}`} className='cursor-pointer'>
              <LogoIcons />
            </Link>
          </div>
          <div className='h-full flex-auto'>
            <Navigation className='hidden lg:flex' />
          </div>
          <div className='flex items-center justify-end gap-x-1 lg:gap-x-2'>
            <div className='flex'>
              <Notification />
              <LanguageSelector />
            </div>
            <div className='flex h-full items-center gap-x-3 lg:gap-x-4'>
              <SelectChain />
              <ConnectWallet />
            </div>
            {isTablet && <MobileDrawer />}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
