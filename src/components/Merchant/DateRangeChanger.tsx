import React from 'react';
import ChevronLeftTriangle from '../common/Icons/ChevronLeftTriangle';
import ChevronRightTriangle from '../common/Icons/ChevronRightTriangle';
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
    <div className='flex w-max items-center justify-center gap-x-2  rounded-[8px] border-0 bg-white px-2 py-2'>
      <button onClick={handleDecreaseClick} className='text-dark-3'>
        <ChevronLeftTriangle />
      </button>
      <div className='text-xs text-dark-4'>
        {dayjs(startDate).format('DD/MM/YYYY')} -{' '}
        {dayjs(endDate).format('DD/MM/YYYY')}
      </div>
      <button
        onClick={handleIncreaseClick}
        disabled={isDisabled}
        className='text-dark-3 disabled:cursor-not-allowed disabled:text-grayBackground/40'
      >
        <ChevronRightTriangle fill={isDisabled ? 'gray' : 'currentColor'} />
      </button>
    </div>
  );
}

export default DateRangeComponent;
