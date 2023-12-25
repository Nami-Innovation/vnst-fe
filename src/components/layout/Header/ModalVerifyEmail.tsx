import Button from '@/components/common/Button';
import CountDown from '@/components/common/CountDown';
import ModalStatus from '@/components/common/Modal/ModalStatus';
import OtpInput from '@/components/common/OTPInput';
import { useTranslationClient } from '@/i18n/client';
import clsx from 'clsx';

type TProps = {
  email: string;
  open: boolean;
  handleClose: () => void;
  title: string;
  content: string;
  btnContent: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  error?: string;
  type: 'update_email' | 'change_email';
  value: string;
  onResend: () => void;
};

const ModalVerifyEmail = ({
  open,
  handleClose,
  title,
  content,
  btnContent,
  onChange,
  onSubmit,
  error,
  value,
  onResend,
}: TProps) => {
  const { t } = useTranslationClient();
  return (
    <ModalStatus
      isOpen={open}
      onRequestClose={() => handleClose()}
      title={<div className='text-gradient text-xl font-bold'>{title}</div>}
      className='!bg-dark-2'
    >
      <div className='flex flex-col items-center justify-center gap-y-4 bg-dark-2'>
        <div className='text-center text-sm'>
          <span>{content}</span>
        </div>
        <div className='flex w-full items-center justify-around'>
          <OtpInput
            value={value}
            valueLength={6}
            onChange={onChange}
            classNameInput={clsx(
              'bg-dark-1 w-10 h-10 rounded-md text-center focus:bg-black-border-gradient outline-none',
              { 'border border-error-100': (error as string).length > 0 }
            )}
          />
        </div>

        <div className='flex flex-col items-center space-y-1'>
          <div className='flex items-center justify-start gap-x-2 text-xs'>
            {t('common:dont_receive')}
            <CountDown className='text-primary' onResend={onResend} />
          </div>
          {error ? <div className="text-xs text-error-100 leading-[14px]">{error}</div> : null}
        </div>
        <div>
          <Button size='md' variant='primary' onClick={onSubmit}>
            {btnContent}
          </Button>
        </div>
      </div>
    </ModalStatus>
  );
};

export default ModalVerifyEmail;
