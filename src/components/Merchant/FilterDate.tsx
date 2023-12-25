import clsx from 'clsx';
import IconButton from '../common/Button/IconButton';
import Button from '../common/Button';
import { DateRangePicker } from 'react-date-range';
import ChevronBottomTriangle from '../common/Icons/ChevronBottomTriangle';
import Popup from '../common/Popup';
import { OPTION_FILTER_DATE } from './contants';
import TickIconSuccess from '../common/Icons/TickIconSuccess';
import { useTranslationClient } from '@/i18n/client';
import { Ref, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import dayjs from '@/lib/dayjs';
import { useIsTablet } from '@/hooks/useMediaQuery';
import Drawer from '../common/Modal/Drawer';
import CancelIcons from '../common/Icons/CancleIcons';

type TProps = {
  setReferenceElement: Ref<HTMLButtonElement>;
  popupRef: any;
  referenceElement: any;
  filter: string;
  setFilter: Function;
};

const FilterDate = ({
  setReferenceElement,
  popupRef,
  referenceElement,
  filter,
  setFilter,
}: TProps) => {
  const [showDateRange, setShowDateRange] = useState(false);
  const isTablet = useIsTablet();
  const params = useSearchParams();
  const range = params.get('range');
  const from = params.get('from');
  const to = params.get('to');
  const handleInitialStartDate = () => {
    let startDate = dayjs().startOf('week').valueOf();
    let endDate = dayjs().valueOf();
    if (range !== null) {
      if (range === 'm') {
        startDate = dayjs().startOf('month').valueOf();
      }
      if (range === '-w') {
        startDate = dayjs().subtract(1, 'week').startOf('week').valueOf();
        endDate = dayjs().subtract(1, 'week').endOf('week').valueOf();
      }
    }
    return {
      startDate,
      endDate,
    };
  };
  const [state, setState] = useState([
    {
      startDate:
        from !== null
          ? new Date(Number(from))
          : new Date(handleInitialStartDate().startDate),
      endDate:
        to !== null
          ? new Date(Number(to))
          : new Date(handleInitialStartDate().endDate),
      key: 'selection',
      color: '#00C096',
    },
  ]);
  const { t } = useTranslationClient('merchant');
  const router = useRouter();
  const pathname = usePathname();
  const handleGenerateDate = () => {
    if (range !== null && range === 'custom') {
      return `${dayjs(Number(from)).format('DD/MM')} - ${dayjs(
        Number(to)
      ).format('DD/MM/YYYY')}`;
    }

    return t(
      OPTION_FILTER_DATE.find((item) => item.key === filter)?.title as string
    );
  };
  const handleClose = () => {
    setShowDateRange(false);
  };
  const handleClick = (item: any) => {
    setFilter(item.key);
    popupRef.current = null;
    setShowDateRange(false);
    if (item.key === 'm') {
      router.replace(
        `${pathname}?range=m&from=${dayjs()
          .startOf('month')
          .valueOf()}&to=${dayjs().endOf('month').valueOf()}`,
        {
          scroll: false,
        }
      );
    } else {
      router.replace(`${pathname}?range=${item.key}`, {
        scroll: false,
      });
    }
  };
  const handleFilterDate = () => {
    router.replace(
      `${pathname}?range=custom&from=${dayjs(
        state[0].startDate
      ).valueOf()}&to=${dayjs(state[0].endDate).endOf('day').valueOf()}`,
      { scroll: false }
    );
    setShowDateRange(false);
    setFilter('custom');
  };

  return (
    <div>
      <IconButton
        ref={setReferenceElement}
        className='rounded-sm flex !w-max items-center justify-center gap-x-2 !border border-grayBackground !bg-white px-2 text-xs !outline lg:bg-transparent'
        size='sm'
      >
        <p>{handleGenerateDate()}</p>
        <ChevronBottomTriangle />
      </IconButton>
      {isTablet === true && showDateRange === true ? null : (
        <Popup
          ref={popupRef}
          referenceElement={referenceElement}
          className={clsx('mt-3 border  border-dark-4 !bg-white', {
            '!rounded-xxl px-6 pb-6': showDateRange === true,
            'rounded-md px-0': showDateRange === false,
          })}
          showArrow={false}
          placement='bottom-end'
          handleClose={handleClose}
        >
          {showDateRange === false ? (
            <div className='w-max py-2 text-xs'>
              {OPTION_FILTER_DATE.map((item) => (
                <button
                  key={item.value}
                  className={clsx(
                    'flex w-full items-center justify-start gap-x-6 p-2 hover:bg-primary/30',
                    {
                      'text-dark-3': filter !== item.key,
                      'text-primary': filter === item.key,
                    }
                  )}
                  onClick={() => handleClick(item)}
                >
                  <p>{t(item.title)}</p>
                  {item.key === filter ? <TickIconSuccess /> : null}
                </button>
              ))}
              <button
                className={clsx(
                  'flex w-full items-center justify-start gap-x-6 p-2 hover:bg-primary/30',
                  {
                    'text-dark-3': filter !== 'custom',
                    'text-primary': filter === 'custom',
                  }
                )}
                onClick={() => {
                  setShowDateRange(true);
                }}
              >
                <p>
                  {from !== null && range === 'custom'
                    ? `${dayjs(Number(from)).format('DD/MM')} - ${dayjs(
                        Number(to)
                      ).format('DD/MM/YYYY')}`
                    : t('common:filter:custom')}
                </p>
                {filter === 'custom' ? <TickIconSuccess /> : null}
              </button>
            </div>
          ) : isTablet === false ? (
            <div className='flex w-full flex-col items-center gap-y-0 rounded-xxl bg-white'>
              {/* @ts-ignore */}
              <DateRangePicker
                onChange={(item) => {
                  setState([
                    {
                      startDate: item.selection.startDate as Date,
                      endDate: item.selection.endDate as Date,
                      key: 'selection',
                      color: '#00C096',
                    },
                  ]);
                }}
                months={2}
                ranges={state}
                direction={'horizontal'}
                disabledDay={(date) => {
                  return date.valueOf() > Date.now();
                }}
                calendarFocus='forwards'
                monthDisplayFormat='MMMM yyyy'
              />
              <Button
                size='md'
                variant='primary'
                onClick={handleFilterDate}
                className='mx-4 w-1/3'
              >
                {t('common:btn:confirm')}
              </Button>
            </div>
          ) : null}
        </Popup>
      )}
      {isTablet ? (
        <Drawer
          isOpen={showDateRange}
          classParent='!bg-grayBackground/70'
          className='h-full !border-0'
        >
          <div className='flex h-full w-full flex-col items-end justify-end'>
            <div className='top-[40%] !h-max w-full rounded-t-xxl !bg-white !pt-5'>
              <div className='relative right-2 flex w-full items-center justify-end px-4'>
                <button
                  onClick={() => setShowDateRange(false)}
                  className='text-grayBackground hover:text-black'
                >
                  <CancelIcons />
                </button>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <div className='text-lg font-bold capitalize text-dark-5'>
                  {t('merchant:custom_date')}
                </div>
                {/* @ts-ignore */}
                <DateRangePicker
                  onChange={(item) => {
                    setState([
                      {
                        startDate: item.selection.startDate as Date,
                        endDate: item.selection.endDate as Date,
                        key: 'selection',
                        color: '#00C096',
                      },
                    ]);
                  }}
                  months={1}
                  ranges={state}
                  direction={'horizontal'}
                  disabledDay={(date) => {
                    return date.valueOf() > Date.now();
                  }}
                  calendarFocus='forwards'
                  monthDisplayFormat='MMMM yyyy'
                  className='w-full px-4'
                />
                <Button
                  size='md'
                  variant='primary'
                  onClick={handleFilterDate}
                  className='mx-4 mb-4 w-1/3 lg:mb-0'
                >
                  {t('common:btn:confirm')}
                </Button>
              </div>
            </div>
          </div>
        </Drawer>
      ) : null}
    </div>
  );
};

export default FilterDate;
