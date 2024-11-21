import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import Modal from '.';
import { Props } from 'react-modal';
import clsx from 'clsx';
import { useIsTablet } from '@/hooks/useMediaQuery';
import Drawer from './Drawer';
interface IModal extends Props {
  variant?: 'primary' | 'danger';
  title: string | ReactNode;
  currentStep?: number;
  totalStep?: number;
  children: any;
}

const ModalStatus = ({
  children,
  title,
  variant = 'primary',
  className,
  totalStep,
  currentStep,
  ...rest
}: IModal) => {
  const [open, setOpen] = useState(() => rest.isOpen);
  useEffect(() => {
    setOpen(rest.isOpen);
  }, [rest]);
  const content = useCallback(() => {
    return (
      <>
        {totalStep && currentStep && totalStep > 1 && totalStep <= 4 && (
          <div
            className={clsx('mb-4 grid gap-x-3 lg:mb-5', {
              'grid-cols-2': totalStep === 2,
              'grid-cols-3': totalStep === 3,
              'grid-cols-4': totalStep === 4,
            })}
          >
            {new Array(totalStep).fill(1).map((_, index) => {
              const active = index + 1 === currentStep;
              return (
                <div
                  key={index}
                  className={clsx('h-1 rounded-xxl', {
                    'bg-primary':
                      index + 1 < currentStep ||
                      (variant === 'primary' && active),
                    'bg-error-100': variant === 'danger' && active,
                    'bg-gray-200': index + 1 > currentStep,
                  })}
                />
              );
            })}
          </div>
        )}
        {children}
      </>
    );
  }, [totalStep, currentStep, children, variant, rest.isOpen]);
  const isTablet = useIsTablet();
  if (isTablet)
    return (
      <Drawer
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          open === false
            ? rest.onRequestClose && rest.onRequestClose({} as any)
            : null;
        }}
        title={title}
        trigger={<div className='hidden'>{title}</div>}
      >
        {content()}
      </Drawer>
    );
  return (
    <Modal
      title={title}
      variant={variant}
      className={clsx('max-w-sm', className)}
      overlayClassName='z-10'
      {...rest}
    >
      {content()}
    </Modal>
  );
};

export default ModalStatus;
