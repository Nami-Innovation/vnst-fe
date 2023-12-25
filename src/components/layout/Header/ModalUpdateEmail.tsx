import Button from '@/components/common/Button';
import ModalStatus from '@/components/common/Modal/ModalStatus';
import useWalletStore from '@/stores/wallet.store';
import { ChangeEvent } from 'react';

type TProps = {
  email: string;
  open: boolean;
  handleClose: () => void;
  title: string;
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
  open,
  handleClose,
  title,
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
    <ModalStatus
      isOpen={open}
      onRequestClose={() => handleClose()}
      title={<div className='text-gradient text-xl font-bold'>{title}</div>}
    >
      <div className='flex flex-col items-center justify-center gap-y-[20px]'>
        <div className='text-center'>
          <span>{content}</span>
        </div>
        <div className='w-full'>
          {type === 'update_email' ? (
            <>
              <input
                placeholder={placeholder}
                onChange={(e) => onChange(e)}
                className='w-full rounded-md bg-black px-4 py-3'
                value={email}
              />
              {error?.email && (
                <span className='pl-2 text-xs text-danger'>{error?.email}</span>
              )}
            </>
          ) : (
            <div className='flex flex-col items-center justify-center'>
              <input
                className='mb-5 w-full rounded-md px-4 py-3 font-semibold disabled:bg-primary/20'
                value={wallet?.email}
                disabled
              ></input>
              <input
                className='w-full rounded-md bg-black px-4 py-3'
                onChange={(e) => onChange(e)}
                placeholder={placeholder}
                value={email}
              ></input>
              {error?.email && (
                <p className='mt-1 w-full pl-2 text-start text-xs text-danger'>
                  {error?.email}
                </p>
              )}
            </div>
          )}
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

export default ModalUpdateEmail;
