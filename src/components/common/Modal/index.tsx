import clsx from 'clsx';
import ReactModal, { Props } from 'react-modal';
import styles from './Modal.module.scss';
import CancelIcons from '../Icons/CancleIcons';
import { ReactNode, useEffect } from 'react';
import { useIsMobile } from '@/hooks/useMediaQuery';
import Drawer from './Drawer';

interface IModal extends Props {
  variant?: 'primary' | 'danger';
  title: string | ReactNode;
  isMobileFullHeight?: boolean;
  children: any;
}

const Modal = ({
  children,
  overlayClassName,
  className,
  variant = 'primary',
  onRequestClose,
  title,
  isMobileFullHeight = false,
  ...rest
}: IModal) => {
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  return (
    <ReactModal
      onAfterOpen={() => (document.body.style.overflow = 'hidden')}
      onAfterClose={() => (document.body.style.overflow = 'unset')}
      overlayClassName={clsx(
        'fixed w-full h-full max-w-full max-h-full top-0 left-0 bg-black bg-opacity-30',
        isMobileFullHeight ? 'pt-[60px] md:pt-24' : 'pt-24',
        overlayClassName
      )}
      className={clsx(
        'mx-auto overflow-hidden rounded-xxl px-4 py-6 outline-none md:px-5 md:py-5',
        isMobileFullHeight
          ? 'h-full bg-white md:h-auto md:bg-white'
          : 'bg-white',
        className,
        styles.modal
      )}
      ariaHideApp={false}
      onRequestClose={onRequestClose}
      {...rest}
    >
      <div className='mb-5 flex-col font-sf-pro-expanded'>
        {!!onRequestClose && (
          <button
            className='mb-3 flex w-full flex-row flex-nowrap items-end justify-end text-gray hover:text-primary'
            onClick={onRequestClose}
          >
            <CancelIcons className='h-5 w-5' />
          </button>
        )}
        <div
          className={clsx(
            'w-full text-center text-lg font-bold leading-[22px] md:text-xl md:leading-6',
            {
              'text-black': variant === 'primary',
              'text-error-100': variant === 'danger',
            }
          )}
        >
          {title}
        </div>
      </div>
      {children}
    </ReactModal>
  );
};

export default Modal;
