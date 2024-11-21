import clsx from 'clsx';
import IconButton from '../common/Button/IconButton';
import Button from '../common/Button';
import { DateRangePicker } from 'react-date-range';
import ChevronBottomTriangle from '../common/Icons/ChevronBottomTriangle';
import Popup from '../common/Popup';
import { OPTION_FILTER_DATE } from './contants';
import TickIconSuccess from '../common/Icons/TickIconSuccess';
import { useTranslationClient } from '@/i18n/client';
import { Ref, useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import dayjs from '@/lib/dayjs';
import { useIsTablet } from '@/hooks/useMediaQuery';
import Drawer from '../common/Modal/Drawer';
import CancelIcons from '../common/Icons/CancleIcons';
import colors from '@/colors';

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
  const [open, setOpen] = useState(false);
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
      color: colors.primary.DEFAULT,
    },
  ]);
  const { t } = useTranslationClient('merchant');
  const router = useRouter();
  const pathname = usePathname();
  const handleGenerateDate = useCallback(() => {
    if (range !== null && range === 'custom') {
      return `${dayjs(Number(from)).format('DD/MM')} - ${dayjs(
        Number(to)
      ).format('DD/MM/YYYY')}`;
    }

    return t(
      OPTION_FILTER_DATE.find((item) => item.key === filter)?.title as string
    );
  }, [range, from, to, filter]);
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
    setOpen(false);
  };
  const renderContent = useMemo(() => {
    return (
      <div className='w-full py-2 text-sm leading-[18px] lg:w-max lg:text-xs lg:leading-4'>
        {OPTION_FILTER_DATE.map((item) => (
          <button
            key={item.value}
            className={clsx(
              'flex w-full items-center justify-between gap-x-6 py-2.5 font-semibold hover:bg-primary/60 hover:text-white lg:justify-start lg:p-2',
              {
                'text-gray': filter !== item.key,
                'text-primary': filter === item.key,
              }
            )}
            onClick={() => {
              handleClick(item);
              setOpen(false);
            }}
          >
            <p>{t(item.title)}</p>
            {item.key === filter ? <TickIconSuccess /> : null}
          </button>
        ))}
        <button
          className={clsx(
            'flex w-full items-center justify-start gap-x-6 py-2.5 font-semibold hover:bg-primary/60 hover:text-white lg:p-2',
            {
              'text-gray': filter !== 'custom',
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
    );
  }, [from, range, to, filter]);
  return (
    <div>
      {!isTablet ? (
        <IconButton
          ref={setReferenceElement}
          className={clsx(
            'rounded-sm flex !w-max items-center justify-center gap-x-2 !border border-grayBackground !bg-white px-2 text-xs font-semibold !outline hover:!bg-primary hover:text-white lg:bg-transparent'
          )}
          size='sm'
        >
          <p>{handleGenerateDate()}</p>
          <ChevronBottomTriangle />
        </IconButton>
      ) : null}
      {isTablet === false ? (
        <Popup
          ref={popupRef}
          referenceElement={referenceElement}
          className={clsx('mt-3 border border-primary !bg-white', {
            '!rounded-xxl px-6 pb-6': showDateRange === true,
            'rounded-md px-0': showDateRange === false,
          })}
          showArrow={false}
          placement='bottom-end'
          handleClose={handleClose}
        >
          {showDateRange === false ? (
            renderContent
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
                      color: colors.primary.DEFAULT,
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
                className='mx-4 w-1/3 font-semibold leading-5'
              >
                {t('common:btn:confirm')}
              </Button>
            </div>
          ) : null}
        </Popup>
      ) : (
        <Drawer
          trigger={
            <IconButton
              ref={setReferenceElement}
              className='rounded-sm flex !w-max items-center justify-center gap-x-2 !border border-grayBackground !bg-white px-2 text-xs !outline lg:bg-transparent'
              size='sm'
            >
              <p>{handleGenerateDate()}</p>
              <ChevronBottomTriangle />
            </IconButton>
          }
          open={open}
          onOpenChange={(open) => {
            if (showDateRange) {
              setShowDateRange(false);
            } else {
              setOpen(open);
            }
          }}
          title={
            <div className='text-lg font-semibold capitalize leading-[22px] text-black'>
              {showDateRange
                ? t('merchant:custom_date')
                : t('merchant:select_time')}
            </div>
          }
        >
          {!showDateRange ? (
            renderContent
          ) : (
            <div className='flex h-full w-full flex-col items-end justify-end'>
              <div className='!h-max w-full rounded-t-xxl !bg-white'>
                <div className='flex flex-col items-center justify-center'>
                  {/* @ts-ignore */}
                  <DateRangePicker
                    onChange={(item) => {
                      setState([
                        {
                          startDate: item.selection.startDate as Date,
                          endDate: item.selection.endDate as Date,
                          key: 'selection',
                          color: colors.primary.DEFAULT,
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
          )}
        </Drawer>
      )}
    </div>
  );
};

export default FilterDate;
