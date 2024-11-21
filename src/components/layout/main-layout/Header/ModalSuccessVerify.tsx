import { useTranslationClient } from '@/i18n/client';

const ModalSuccessVerify = () => {
  const { t } = useTranslationClient();

  return (
    <div className='flex flex-col items-center justify-center gap-y-5'>
      <img
        src='/assets/icons/success_bubble.png'
        width={120}
        height={120}
        alt='Image error'
        className='h-[120px] w-[120px] object-cover'
      />
      <div className='w-full text-center'>
        <span className='text-sm font-semibold leading-[18px] text-gray lg:text-base lg:leading-5'>
          {t('common:success_verify_content')}
        </span>
      </div>
    </div>
  );
};

export default ModalSuccessVerify;
