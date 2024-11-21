'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useIsTablet } from '@/hooks/useMediaQuery';
import useLang from '@/hooks/useLang';
import LogoIcons from '@/components/common/Icons/LogoIcon';

const ConnectWallet = dynamic(() => import('./ConnectWallet'), {
  ssr: false,
});

const Header = () => {
  const lang = useLang();
  return (
    <>
      <header className='fixed top-[-2px] z-10 h-[60px] w-full bg-secondary-darkest'>
        <div className='bg-header-tma h-full w-full px-4 pt-[2px]'>
          <div className='mx-auto flex h-full items-center justify-between lg:max-w-screen-xl'>
            <div>
              <Link href={`/${lang}/tma`} className='cursor-pointer'>
                <LogoIcons />
              </Link>
            </div>
            <div className='flex items-center justify-end gap-x-1 lg:gap-x-2'>
              <div className='flex h-full items-center gap-x-3 lg:gap-x-4'>
                <ConnectWallet />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
