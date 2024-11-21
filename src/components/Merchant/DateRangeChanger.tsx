import React from 'react';
import ChevronLeftTriangle from '../common/Icons/ChevronLeftTriangle';
import dayjs from '@/lib/dayjs';

type TProps = {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  handleDecreaseClick: () => void;
  handleIncreaseClick: () => void;
};

function DateRangeComponent({
  startDate,
  endDate,
  handleDecreaseClick,
  handleIncreaseClick,
}: TProps) {
  const isDisabled = dayjs(endDate).isToday();

  return (
    <div className='flex w-max items-center justify-center gap-x-2  rounded-[6px] border border-gray-200 bg-white px-2 py-2'>
      <button onClick={handleDecreaseClick} className='text-gray w-3 h-3'>
        <ChevronLeftTriangle className='h-full w-full' />
      </button>
      <div className='text-xs font-semibold leading-4 text-gray'>
        {dayjs(startDate).format('DD/MM/YYYY')} -{' '}
        {dayjs(endDate).format('DD/MM/YYYY')}
      </div>
      <button
        onClick={handleIncreaseClick}
        disabled={isDisabled}
        className='text-gray w-3 h-3 disabled:cursor-not-allowed disabled:text-grayBackground/40'
      >
        <ChevronLeftTriangle fill={isDisabled ? 'gray' : 'currentColor'} className='h-full w-full rotate-180' />
      </button>
    </div>
  );
}

export default DateRangeComponent;
