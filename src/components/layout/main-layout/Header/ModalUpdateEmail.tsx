import Button from '@/components/common/Button';
import ModalStatus from '@/components/common/Modal/ModalStatus';
import useWalletStore from '@/stores/wallet.store';
import clsx from 'clsx';
import { ChangeEvent } from 'react';

type TProps = {
  email: string;
  content: string;
  placeholder: string;
  btnContent: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  error: {
    email: string;
  };
  type: 'update_email' | 'change_email';
};

const ModalUpdateEmail = ({
  content,
  placeholder,
  btnContent,
  onChange,
  onSubmit,
  error,
  type,
  email,
}: TProps) => {
  const { wallet } = useWalletStore();
  return (
    <div className='flex flex-col items-center justify-center gap-y-4 lg:gap-y-5'>
      <div className='text-start lg:text-center'>
        <span className='text-base font-semibold leading-5 text-gray'>
          {content}
        </span>
      </div>
      <div className='w-full'>
        {type === 'update_email' ? (
          <>
            <input
              placeholder={placeholder}
              onChange={(e) => {
                onChange(e);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSubmit();
                }
              }}
              className={clsx(
                'w-full rounded-md border bg-gray-300 px-3 py-2 text-base font-semibold leading-5  outline-primary sm:px-4 sm:py-3',
                !!error?.email
                  ? 'border-error-100 text-error-100'
                  : 'border-gray-200 text-gray'
              )}
              value={email}
            />
            {error?.email && (
              <span className='text-xs font-semibold text-error-100'>
                {error?.email}
              </span>
            )}
          </>
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <input
              className='mb-5 w-full rounded-md px-4 py-2.5 text-base font-semibold leading-5 text-primary-dark disabled:bg-primary-light'
              value={wallet?.email}
              disabled
            ></input>
            <input
              className={clsx(
                'w-full rounded-md bg-gray-300 px-4 py-2.5 text-base font-semibold leading-5 text-gray outline-primary placeholder:text-gray lg:outline-none',
                !!error?.email
                  ? '!text-error-100 !outline-error-100'
                  : 'border-gray-200 text-gray'
              )}
              onChange={(e) => onChange(e)}
              placeholder={placeholder}
              value={email}
            ></input>
            {error?.email && (
              <p className='mt-[6px] w-full text-start text-xs font-semibold text-error-100'>
                {error?.email}
              </p>
            )}
          </div>
        )}
      </div>
      <div className='w-full'>
        <Button
          size='md'
          variant='primary'
          onClick={onSubmit}
          className='w-full font-semibold'
        >
          {btnContent}
        </Button>
      </div>
    </div>
  );
};

export default ModalUpdateEmail;
