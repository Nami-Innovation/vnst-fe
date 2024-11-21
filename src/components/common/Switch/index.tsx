import clsx from 'clsx';
import React, { useState } from 'react';

const ToggleSwitch = ({
  toggle,
  setToggle,
}: {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
}) => {
  return (
    <div
      className={clsx(
        'flex h-5 w-10 cursor-pointer items-center rounded-full  px-0.5 py-1',
        {
          'border border-primary bg-primary-light': toggle === true,
          'border border-gray-200 bg-gray-200': toggle === false,
        }
      )}
      onClick={() => {
        setToggle(!toggle);
      }}
    >
      <div
        className={clsx(
          'h-[14px] w-[14px] transform rounded-full shadow-md duration-300 ease-in-out',
          {
            'bg-dark-3': toggle === false,
            'translate-x-5 transform bg-white': toggle === true,
          }
        )}
      ></div>
    </div>
  );
};

export default ToggleSwitch;
