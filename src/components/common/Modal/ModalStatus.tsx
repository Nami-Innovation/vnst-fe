import React, { ReactNode } from 'react';
import Modal from '.';
import { Props } from 'react-modal';
import clsx from 'clsx';

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
  return (
    <Modal
      title={title}
      variant={variant}
      className={clsx('max-w-sm', className)}
      overlayClassName='z-10'
      {...rest}
    >
      {totalStep && currentStep && totalStep > 1 && totalStep <= 4 && (
        <div
          className={clsx('mb-4 grid gap-x-3', {
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
                  'bg-danger': variant === 'danger' && active,
                  'bg-dark-2': index + 1 > currentStep,
                })}
              />
            );
          })}
        </div>
      )}
      {children}
    </Modal>
  );
};

export default ModalStatus;
