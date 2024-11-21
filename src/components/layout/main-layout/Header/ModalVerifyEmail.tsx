import Button from '@/components/common/Button';
import CountDown from '@/components/common/CountDown';
import ModalStatus from '@/components/common/Modal/ModalStatus';
import OtpInput from '@/components/common/OTPInput';
import { useTranslationClient } from '@/i18n/client';
import clsx from 'clsx';

type TProps = {
  email: string;
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
    <div className='flex flex-col items-center justify-center gap-y-5'>
      <div className='text-start text-base font-semibold leading-5 text-gray lg:text-center'>
        <span>{content}</span>
      </div>
      <div className='flex w-full items-center justify-around'>
        <OtpInput
          value={value}
          valueLength={6}
          onChange={onChange}
          classNameInput={clsx(
            'bg-secondary-lightest w-10 text-base font-semibold placeholder:text-gray text-primary-dark h-10 rounded-[8px] text-center border border-gray-200 focus:border-primary outline-none',
            {
              '!border-error-100 !text-error-100': (error as string).length > 0,
            }
          )}
          submitForm={onSubmit}
        />
      </div>

      <div className='flex flex-col items-center space-y-1'>
        {error ? (
          <div className='text-xs font-semibold leading-4 text-error-100'>
            {error}
          </div>
        ) : null}
        <div className='flex items-center justify-start gap-x-2 text-xs font-semibold leading-4 text-gray'>
          {t('common:dont_receive')}
          <CountDown
            className='text-xs font-semibold leading-[14px] text-primary'
            onResend={onResend}
          />
        </div>
      </div>
      <div className='w-full'>
        <Button
          size='md'
          variant='primary'
          className='w-full'
          disabled={value.length === 0 || (error as string)?.length > 0}
          onClick={onSubmit}
        >
          {btnContent}
        </Button>
      </div>
    </div>
  );
};

export default ModalVerifyEmail;
