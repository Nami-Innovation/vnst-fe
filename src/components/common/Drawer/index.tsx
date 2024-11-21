import React from 'react';
import CancelIcons from '../Icons/CancleIcons';
import { cn } from '@/utils/helper';
import styles from './Draw.module.scss';

interface DrawerProps {
  isOpen: boolean;
  onClose: any;
  children: React.ReactNode;
  className?: string;
  variant: 'primary' | 'danger';
  title: string | React.ReactNode;
  totalStep: number;
  currentStep: number;
}

const DrawerTma: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  className,
  variant,
  title,
  totalStep,
  currentStep,
}) => {
  const content = React.useCallback(() => {
    return (
      <>
        {totalStep && currentStep && totalStep > 1 && totalStep <= 4 && (
          <div
            className={cn('mb-4 grid gap-x-3 lg:mb-5', {
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
                  className={cn('h-1 rounded-xxl', {
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
  }, [totalStep, currentStep, children, variant]);

  return (
    <div
      className={`fixed inset-0 overflow-hidden bg-transparent duration-500 ${isOpen ? 'z-50' : '-z-10'}`}
    >
      <div
        className={cn(
          'fixed inset-0 bg-black bg-opacity-50 transition-opacity',
          styles.overlay
        )}
        onClick={onClose}
      ></div>
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 flex max-h-full transform rounded-t-xxl bg-white',
          styles.drawer
        )}
      >
        <div className='max-h-full w-screen p-4 text-right shadow-xl'>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700'
          >
            <CancelIcons className='h-5 w-5 text-gray' />
          </button>
          <div className={cn('my-4', className)}>
            <div
              className={cn(
                'mb-4 w-full text-center font-sf-pro-expanded text-lg font-bold leading-5 md:text-xl md:leading-6',
                {
                  'text-black': variant === 'primary',
                  'text-error-100': variant === 'danger',
                }
              )}
            >
              {title}
            </div>
            {content()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawerTma;
