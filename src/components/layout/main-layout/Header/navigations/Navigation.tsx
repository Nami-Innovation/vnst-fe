'use client';

import { Navigations } from '@/configs/navigation';
import React from 'react';
import NavLink from './NavLink';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useTranslationClient } from '@/i18n/client';
import useLang from '@/hooks/useLang';
import { directWhitepaperPage } from '@/components/common/utils/header';

type Props = {
  className?: string;
};

const Navigation = ({ className }: Props) => {
  const lang = useLang();
  const pathname = usePathname();
  const { t } = useTranslationClient('navigation');

  return (
    <div
      className={clsx(
        'flex h-full w-full flex-col items-start gap-x-2 text-white md:gap-x-5 lg:flex-row lg:items-center lg:gap-x-5 xl:gap-x-10',
        className
      )}
    >
      {Navigations.map((nav) => {
        let localeHref = `/${lang}${nav.href}`;
        if (localeHref.endsWith('/'))
          localeHref = localeHref.slice(0, localeHref.length - 1);
        const isActive =
          nav.href === pathname || pathname.startsWith(localeHref);
        return (
          <NavLink
            key={nav.title}
            href={nav?.blank ? directWhitepaperPage(lang) : localeHref}
            active={isActive}
            className='flex h-full items-center'
            isTarget={nav.blank}
          >
            {t(nav.title)}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Navigation;
