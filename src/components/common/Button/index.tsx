import { ForwardedRef, ReactNode, forwardRef } from 'react';
import clsx from 'clsx';

interface ButtonI extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  prevIcon?: ReactNode;
  nextIcon?: ReactNode;
  size: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'tertiary';
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
        className={clsx(
          className,
          'flex items-center justify-center px-4 leading-6 outline-none disabled:cursor-not-allowed',
          {
            'h-6 rounded-[5px] !px-3 text-xs': size === 'xs',
            'h-8 rounded text-xs': size === 'sm',
            'h-10 rounded-md text-base': size === 'md',
            'h-12 rounded-lg text-base': size === 'lg',
            'bg-gradient-to-r from-primary-dark via-primary to-primary-dark bg-[length:200%] bg-left transition-[background-position] duration-300 hover:bg-right hover:shadow-[0_0_26px_0_rgba(0,192,150,0.6)]':
              variant === 'primary' && !disabled,
            'border border-dark-2 bg-dark-1 text-dark-3':
              variant === 'secondary' && !disabled,
            'bg-primary-dark bg-opacity-40 text-primary-dark': disabled,
            'pr-2': !!nextIcon,
            'pl-2': !!prevIcon,
          }
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
