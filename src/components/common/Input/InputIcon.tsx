/* eslint-disable react/display-name */
import React, { KeyboardEventHandler, ReactNode, forwardRef } from 'react';
import Input from './index';
import clsx from 'clsx';
type TProps = {
  className?: string;
  prevIcon?: ReactNode;
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
  value: string;
  classNameInput: string;
  nextIcon?: ReactNode;
};

const InputIcon = forwardRef<HTMLInputElement, TProps>(
  (
    {
      value,
      placeholder,
      onChange,
      prevIcon,
      nextIcon,
      className,
      classNameInput,
      onKeyDown,
    },
    ref
  ) => {
    return (
      <div
        className={clsx(
          className,
          'flex items-center justify-between rounded-md'
        )}
      >
        {prevIcon}
        <Input
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          ref={ref}
          classNameInput={classNameInput}
          onKeyDown={onKeyDown}
        />
        {nextIcon}
      </div>
    );
  }
);

export default InputIcon;
