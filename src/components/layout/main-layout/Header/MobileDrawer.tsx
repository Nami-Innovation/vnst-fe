'use client';

import Drawer from '@/components/common/Modal/Drawer';
import React, { useState } from 'react';
import { Navigations } from '@/configs/navigation';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { useTranslationClient } from '@/i18n/client';
import { LINK_DIRECT } from '@/components/common/utils/header';
import { LANGUAGE } from '@/utils/type';
// import ExternalLink from '@/components/common/Icons/ExternalLink';
import BarsIcons from '@/components/common/Icons/BarsIcons';

const MobileDrawer = () => {
  const { lang } = useParams();
  const pathname = usePathname();
  const { t } = useTranslationClient(['common', 'navigation']);
  const [open, setOpen] = useState(false);
  return (
    <Drawer
      trigger={
        <div className='block text-gray lg:hidden'>
          <BarsIcons className='h-5 w-5' />
        </div>
      }
      open={open}
      onOpenChange={(open) => setOpen(open)}
    >
      <div className='mt-4 flex flex-col items-start gap-y-6'>
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
                'w-max text-start font-sf-pro-expanded text-lg font-bold leading-[22px]',
                isActive
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray'
              )}
              onClick={() => setOpen(false)}
            >
              {t(`navigation:${nav.title}`)}
            </Link>
          );
        })}
      </div>
    </Drawer>
  );
};

export default MobileDrawer;
