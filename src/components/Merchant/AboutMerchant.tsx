'use client';
import { useTranslationClient } from '@/i18n/client';
import TooltipIcon from '../common/Icons/TooltipIcon';
import clsx from 'clsx';
import { ObjectMerchant } from '@/types/merchant';

type Props = {
  setShowAbout: React.Dispatch<boolean>;
  textColor: string;
  title: string;
  object: ObjectMerchant;
  aboutTitle: string;
  aboutContent: string;
};

export default function AboutMerchantComponent({
  setShowAbout,
  textColor,
  title,
  object,
  aboutTitle,
  aboutContent,
}: Props) {
  const { t } = useTranslationClient('merchant');
  return (
    <div className='scroll-y-auto w-full items-center justify-around gap-x-10 rounded-md bg-gray-300 px-4 py-4 lg:flex lg:h-max lg:max-h-[116px]'>
      <p
        dangerouslySetInnerHTML={{
          __html: t(aboutContent, {
            linkIOS: object.linkIOS,
            linkAndroid: object.linkAndroid,
          }),
        }}
        className='flex-1 text-center text-xs font-semibold leading-4 text-gray lg:text-start'
      />
    </div>
  );
}
