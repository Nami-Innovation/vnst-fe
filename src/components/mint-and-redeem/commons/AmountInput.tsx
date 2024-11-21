import clsx from 'clsx';
import React from 'react';
import { IMaskInput, IMaskInputProps } from 'react-imask';

type Ref = HTMLInputElement;

const AmountInput = React.forwardRef<Ref, IMaskInputProps<HTMLInputElement>>(
  ({ className, onAccept, onBlur, value, disabled }, ref) => {
    return (
      <IMaskInput
        mask={Number}
        radix='.'
        unmask={true}
        className={clsx(
          'h-8 w-full bg-transparent pl-4 text-right font-sf-pro-expanded text-lg font-bold leading-[22px] text-black outline-none placeholder:font-semibold placeholder:text-gray lg:text-xl lg:leading-6',
          className
        )}
        inputRef={ref}
        placeholder='0.0'
        thousandsSeparator=','
        scale={2}
        value={value}
        onAccept={onAccept}
        onBlur={onBlur}
        disabled={disabled}
        // {...rest}
      />
    );
  }
);

export default AmountInput;
