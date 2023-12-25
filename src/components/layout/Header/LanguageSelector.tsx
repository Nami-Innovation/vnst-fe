import IconButton from '@/components/common/Button/IconButton';
import SystemLanguageIcon from '@/components/common/Icons/SystemLanguageIcon';
import Popup from '@/components/common/Popup';
import React, { useRef, useState } from 'react';
import LanguageItem from './LanguageItem';
import { usePathname, useRouter } from 'next/navigation';
import { languages } from '@/i18n/settings';
import { useTranslationClient } from '@/i18n/client';
import useLang from '@/hooks/useLang';

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
      <IconButton
        className='hidden text-dark-3 lg:flex'
        ref={setReferenceElement}
      >
        <SystemLanguageIcon />
      </IconButton>

      <Popup
        ref={popupRef}
        referenceElement={referenceElement}
        className='mt-8 w-44 p-2'
      >
        <div className='flex flex-col gap-y-2'>
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
      </Popup>
    </>
  );
};

export default LanguageSelector;
