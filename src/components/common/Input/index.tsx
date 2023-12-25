/* eslint-disable react/display-name */
import React, { KeyboardEventHandler, ReactNode, forwardRef } from 'react';

type TProps = {
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  classNameInput: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
};

const Input = forwardRef<HTMLInputElement, TProps>(
  ({ value, placeholder, onChange, classNameInput, onKeyDown }, ref) => {
    return (
      <input
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        ref={ref}
        className={classNameInput}
        onKeyDown={onKeyDown}
      />
    );
  }
);

export default Input;
