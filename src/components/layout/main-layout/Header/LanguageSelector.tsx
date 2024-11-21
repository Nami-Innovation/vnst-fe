import IconButton from '@/components/common/Button/IconButton';
import SystemLanguageIcon from '@/components/common/Icons/SystemLanguageIcon';
import Popup from '@/components/common/Popup';
import React, { useCallback, useRef, useState } from 'react';
import LanguageItem from './LanguageItem';
import { usePathname, useRouter } from 'next/navigation';
import { languages } from '@/i18n/settings';
import { useTranslationClient } from '@/i18n/client';
import useLang from '@/hooks/useLang';
import { useIsTablet } from '@/hooks/useMediaQuery';
import Drawer from '@/components/common/Modal/Drawer';

const LanguageSelector = () => {
  const popupRef = useRef<any>();
  const lang = useLang();
  const { t } = useTranslationClient('language');
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isTablet = useIsTablet();
  const changeLanguage = (newLang: string) => {
    const newPathName = pathname.replace(`/${lang}`, `/${newLang}`);
    router.replace(newPathName);
  };
  const content = useCallback(() => {
    return (
      <div className='flex flex-col gap-y-1 lg:gap-y-2 '>
        {languages.map((locale) => (
          <LanguageItem
            key={locale}
            title={t(locale)}
            active={lang === locale}
            onClick={() => changeLanguage(locale)}
            lang={locale}
          />
        ))}
      </div>
    );
  }, [lang, pathname]);
  if (isTablet)
    return (
      <Drawer
        trigger={
          <IconButton className='text-dark-3' ref={setReferenceElement}>
            <SystemLanguageIcon className='h-5 w-5' />
          </IconButton>
        }
        title={
          <div className='font-sf-pro-expanded text-lg font-bold leading-[22px] text-black'>
            {t('common:select_lang')}
          </div>
        }
        contentClassName='!px-0'
        closeClassName='px-4'
      >
        {content()}
      </Drawer>
    );

  return (
    <>
      <IconButton
        className='hidden text-dark-3 lg:flex'
        ref={setReferenceElement}
      >
        <SystemLanguageIcon className='h-5 w-5' />
      </IconButton>

      <Popup
        ref={popupRef}
        referenceElement={referenceElement}
        className='mt-6 w-32 py-2'
        showArrow={false}
      >
        {content()}
      </Popup>
    </>
  );
};

export default LanguageSelector;
