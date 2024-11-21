import React, { useMemo } from 'react';
const RE_DIGIT = new RegExp(/^\d+$/);
export type Props = {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
  classNameInput: string;
  submitForm: () => void;
};

export default function OtpInput({
  value,
  valueLength,
  onChange,
  classNameInput,
  submitForm,
}: Props) {
  const valueItems = useMemo(() => {
    const valueArray = value.split('');
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push('');
      }
    }

    return items;
  }, [value, valueLength]);

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };
  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    e.stopPropagation();
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    // Ignore non-digit and non-empty inputs
    if (!isTargetValueDigit && targetValue !== '') {
      return;
    }

    const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

    // Ignore if the input is not a digit and the next input is not empty
    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
      return;
    }

    // Set targetValue to space if not digit
    targetValue = isTargetValueDigit ? targetValue : ' ';

    const targetValueLength = targetValue.length;

    // If a single digit is entered
    if (targetValueLength === 1) {
      const newValue =
        value.substring(0, idx) + targetValue + value.substring(idx + 1);

      onChange(newValue);
      if (!isTargetValueDigit) {
        return;
      }

      focusToNextInput(target);

      // If the concatenated value reaches the desired length, submit the form
      if (newValue.length === valueLength && newValue === value) {
        // Replace with your submit function
        setTimeout(() => submitForm(), 200);
      }

      // If the input matches the total desired value length
    } else if (targetValueLength === valueLength) {
      onChange(targetValue);
      target.blur();
      setTimeout(() => submitForm(), 200);
    }
  };
  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    const targetValue = target.value;

    // keep the selection range position
    // if the same digit was typed
    target.setSelectionRange(0, targetValue.length);

    if (e.key !== 'Backspace' || targetValue !== '') {
      return;
    }

    focusToPrevInput(target);
  };
  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;

    // keep focusing back until previous input
    // element has value
    const prevInputEl =
      target.previousElementSibling as HTMLInputElement | null;

    if (prevInputEl && prevInputEl.value === '') {
      return prevInputEl.focus();
    }

    target.setSelectionRange(0, target.value.length);
  };

  const getOTPValue = () => (value ? value.toString().split('') : []);
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const otp = getOTPValue();
    let nextActiveInput = 0;

    // Get pastedData in an array of max size (num of inputs - current position)
    const pastedData = event.clipboardData
      .getData('text/plain')
      .slice(0, 6)
      .split('');

    // Prevent pasting if the clipboard data contains non-numeric values for number inputs
    if (pastedData.some((value) => isNaN(Number(value)))) {
      return;
    }

    // Paste data from focused input onwards
    for (let pos = 0; pos < 6; ++pos) {
      if (pos >= 0 && pastedData.length > 0) {
        otp[pos] = pastedData.shift() ?? '';
        nextActiveInput++;
      }
    }

    onChange(otp.join(''));
  };

  return (
    <div className='flex w-full items-center justify-around gap-x-3'>
      {valueItems.map((digit, idx) => (
        <input
          key={idx}
          type='text'
          inputMode='numeric'
          autoComplete='one-time-code'
          placeholder='-'
          pattern='\d{1}'
          maxLength={valueLength}
          className={classNameInput}
          value={digit}
          onChange={(e) => inputOnChange(e, idx)}
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}
