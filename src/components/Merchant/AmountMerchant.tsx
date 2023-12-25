import clsx from 'clsx';
import React from 'react';
import QuestionMarkIcon from '../common/Icons/QuestionMarkIcon';

type TProps = {
  title: string;
  amount: number;
  isLogin: boolean;
};

const AmountMerchant = ({ title, amount, isLogin }: TProps) => {
  return (
    <div className='w-full rounded-xl bg-gray-100 dark:bg-gray-800 lg:w-[384px]'>
      <div className='flex w-full flex-col items-center gap-y-1 p-6 text-black dark:text-white'>
        <div className='flex flex-row items-center font-bold'>
          <span>{title}</span>
          <QuestionMarkIcon />
        </div>
        <div>
          <span
            className={clsx({
              'backdrop-blur-[5px]': isLogin,
            })}
          >
            {amount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AmountMerchant;
