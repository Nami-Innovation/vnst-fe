import { ForwardedRef, ReactNode, forwardRef } from 'react';
import clsx from 'clsx';

interface ButtonPaginationProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  prevIcon?: ReactNode;
  nextIcon?: ReactNode;
  size: 'xs' | 'lg';
  variant?: 'active' | 'inactive';
  outline?: boolean;
}

const ButtonPagination = forwardRef(
  (
    {
      children,
      className,
      prevIcon,
      nextIcon,
      type = 'button',
      size,
      variant,
      outline = false,
      disabled,
      ...rest
    }: ButtonPaginationProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        className={clsx(
          className,
          'flex items-center justify-center rounded-[6px] text-base font-semibold leading-5 outline-none disabled:cursor-not-allowed',
          {
            'h-7 w-7 px-2.5 py-1': size === 'xs',
            'h-8 w-8 px-3 py-1 lg:h-7 lg:w-7': size === 'lg',
            '!bg-primary text-white': variant === 'active' && !disabled,
            'inactive border border-solid border-gray-200 bg-white text-gray hover:bg-primary hover:text-white':
              variant === 'inactive' && !disabled,
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

export default ButtonPagination;
