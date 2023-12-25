'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navigation from './navigations/Navigation';
import LanguageSelector from './LanguageSelector';
import BarsIcons from '@/components/common/Icons/BarsIcons';
import { useIsTablet } from '@/hooks/useMediaQuery';
import CancelIcons from '@/components/common/Icons/CancleIcons';
import useLang from '@/hooks/useLang';

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
  const [isOpenMobileNav, setIsOpenMobileNav] = useState(false);
  const isTablet = useIsTablet();
  const lang = useLang();
  return (
    <>
      <header className='fixed top-0 z-10 h-[60px] w-full border-dark-1 bg-black px-4 py-2.5 lg:relative lg:top-auto lg:h-[80px] lg:border-b lg:py-5 xl:px-0'>
        <div className='mx-auto flex h-full items-center justify-between lg:max-w-screen-xl'>
          <div className='flex items-center gap-x-2 lg:w-[220px]'>
            <Link href={`/${lang}`} className='cursor-pointer'>
              <img
                src='/assets/images/logo.svg'
                alt='VNST'
                className='h-full'
              />
            </Link>
            <div className='hidden rounded-md border border-primary-dark px-2 py-1 text-xs capitalize text-white md:block'>
              beta
            </div>
          </div>
          <div className='flex-1'>
            <Navigation className='hidden lg:flex' />
          </div>
          <div className='flex w-max items-center justify-end gap-x-2 lg:w-[250px]'>
            <Notification />
            <LanguageSelector />

            <ConnectWallet onClick={() => setIsOpenMobileNav(false)} />
            <button
              className='lg:hidden'
              onClick={() => setIsOpenMobileNav(!isOpenMobileNav)}
            >
              {isOpenMobileNav ? <CancelIcons /> : <BarsIcons />}
            </button>
          </div>
        </div>
      </header>
      {isTablet !== null && isTablet && (
        <MobileDrawer
          isOpen={isOpenMobileNav}
          setIsOpenMobileNav={setIsOpenMobileNav}
        />
      )}
    </>
  );
};

export default Header;
