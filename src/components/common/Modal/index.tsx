import clsx from 'clsx';
import ReactModal, { Props } from 'react-modal';
import styles from './Modal.module.scss';
import CancelIcons from '../Icons/CancleIcons';
import { ReactNode, useEffect } from 'react';

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
        'fixed w-full h-full max-w-full max-h-full top-0 left-0 bg-black bg-opacity-70',
        isMobileFullHeight ? 'pt-[60px] md:pt-24' : 'pt-24',
        overlayClassName
      )}
      className={clsx(
        'mx-auto overflow-hidden px-4 py-6 outline-none md:px-5 md:py-5',
        isMobileFullHeight
          ? 'h-full border-t-[2px] border-dark-1 bg-black md:h-auto md:rounded-xl md:bg-dark-1'
          : 'rounded-xl bg-dark-1',
        className,
        styles.modal
      )}
      ariaHideApp={false}
      onRequestClose={onRequestClose}
      {...rest}
    >
      <div className='relative mb-5 font-sf-pro-expanded'>
        <div
          className={clsx('text-center text-lg font-bold md:text-xl', {
            'text-gradient': variant === 'primary',
            'text-danger': variant === 'danger',
          })}
        >
          {title}
        </div>
        {!!onRequestClose && (
          <button
            className='absolute right-0 top-0 text-dark-3'
            onClick={onRequestClose}
          >
            <CancelIcons />
          </button>
        )}
      </div>
      {children}
    </ReactModal>
  );
};

export default Modal;
