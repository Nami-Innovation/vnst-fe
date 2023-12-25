import React, { ForwardedRef, forwardRef } from 'react';
import clsx from 'clsx';

interface ButtonI extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
}

const IconButton = forwardRef(
  (
    { children, className, size = 'md', ...rest }: ButtonI,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        className={clsx(
          'group flex items-center justify-center rounded text-dark-3 outline-none transition-colors duration-300',
          {
            'h-8 w-8': size === 'sm',
            'h-10 w-10': size === 'md',
            'h-12 w-12': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default IconButton;
