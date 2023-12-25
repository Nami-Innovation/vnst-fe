import ModalStatus from '@/components/common/Modal/ModalStatus';
import { useTranslationClient } from '@/i18n/client';

type TProps = {
  open: boolean;
  handleClose: () => void;
};

const ModalSuccessVerify = ({ open, handleClose }: TProps) => {
  const { t } = useTranslationClient();

  return (
    <ModalStatus
      title={<div>{t('common:success_verify')}</div>}
      isOpen={open}
      onRequestClose={handleClose}
    >
      <div className='flex flex-col items-center justify-center'>
        <img
          src='/assets/icons/success_bubble.png'
          width={120}
          height={120}
          alt='Image error'
          className='aspect-square w-2/3 object-cover'
        />
        <div className='w-full text-center'>
          <span className='font-semibold text-white'>
            {t('common:success_verify_content')}
          </span>
        </div>
      </div>
    </ModalStatus>
  );
};

export default ModalSuccessVerify;
