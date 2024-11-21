import { ForwardedRef, ReactNode, forwardRef } from 'react';
import { cn } from '@/utils/helper';

interface ButtonI extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  prevIcon?: ReactNode;
  nextIcon?: ReactNode;
  size: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'chip';
  outline?: boolean;
}
const Button = forwardRef(
  (
    {
      children,
      className,
      prevIcon,
      nextIcon,
      type = 'button',
      size,
      variant = 'primary',
      outline = false,
      disabled,
      ...rest
    }: ButtonI,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        className={cn(
          'flex items-center justify-center px-4 font-semibold text-white outline-none disabled:cursor-not-allowed',
          {
            'h-6 rounded-[4px] !px-3 text-xs leading-4': size === 'xs',
            'h-8 rounded-[6px] text-xs leading-4': size === 'sm',
            'h-10 rounded text-base leading-5': size === 'md',
            'h-12 rounded-md text-base leading-5': size === 'lg',
            'bg-primary bg-[length:200%] bg-left hover:bg-primary-dark':
              variant === 'primary' && !disabled,
            'border border-primary bg-white text-primary-dark hover:bg-primary hover:text-white':
              variant === 'secondary' && !disabled,
            'bg-primary bg-opacity-[0.24] text-white':
              variant === 'primary' && disabled,
            'border border-primary bg-white bg-opacity-[0.24] text-primary-dark':
              variant === 'secondary' && disabled,
            'pr-2': !!nextIcon,
            'pl-2': !!prevIcon,
            'border border-gray-200 bg-white text-gray hover:bg-primary hover:text-white':
              variant === 'chip',
          },
          className
        )}
        type={type}
        disabled={disabled}
        ref={ref}
        {...rest}
      >
        {prevIcon}
        {children}
        {nextIcon}
      </button>
    );
  }
);

export default Button;
