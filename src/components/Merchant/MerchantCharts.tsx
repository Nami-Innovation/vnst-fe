'use client';
import React, { useState, Ref } from 'react';
import clsx from 'clsx';
import { useTranslationClient } from '@/i18n/client';
import Button from '../common/Button';
import type { ApexOptions } from 'apexcharts';
import FilterDate from './FilterDate';
import { ResponseChart } from '@/types/merchant';
import { formatNumber, numberFormater } from '@/utils/format';
import dayjs from '@/lib/dayjs';
import { convertMoney } from '../home/constant';
import { useSearchParams } from 'next/navigation';
import ReactECharts from '../common/Charts';
import colors from '@/colors';

const BTN_FILTERS = [
  {
    title: 'merchant:mass',
    value: 'notionalValue',
  },
  {
    title: 'merchant:quantity',
    value: 'count',
  },
];
type TProps = {
  setReferenceElement: Ref<HTMLButtonElement>;
  popupRef: any;
  referenceElement: any;
  filter: string;
  setFilter: Function;
  dataChart: ResponseChart;
  marketPrice: number;
};

const MerchantChart = ({
  setReferenceElement,
  popupRef,
  referenceElement,
  filter,
  setFilter,
  dataChart,
  marketPrice,
}: TProps) => {
  const { result } = dataChart;
  const { t } = useTranslationClient();
  const [filterType, setFilterType] = useState<'notionalValue' | 'count'>(
    'notionalValue'
  );
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const isShowWeekTime =
    dayjs(Number(from)).diff(dayjs(Number(to)), 'month') !== 0;
  const categories = result.map((item) => item._id);
  const option: ApexOptions = {
    xaxis: {
      type: 'category',
      categories,
      axisBorder: {
        show: true,
        color: '#78909C',
      },
      crosshairs: {
        show: true,
        stroke: {
          color: colors.primary.dark,
        },
      },
      labels: {
        show: true,
        hideOverlappingLabels: true,
        formatter: (value: string) => {
          if (value !== undefined) {
            const firstDateOfWeek = dayjs(value, 'DD/MM/YYYY').add(-6, 'day');
            if (value === categories[categories.length - 1]) {
              return dayjs(value, 'DD/MM/YYYY').format('DD/MM');
            }
            if (isShowWeekTime || filter === 'm') {
              return firstDateOfWeek.format('DD/MM');
            }
            if (filter === 'all') {
              return dayjs(value, 'DD/MM/YYYY')
                .startOf('month')
                .format('DD/MM');
            } else return dayjs(value, 'DD/MM/YYYY').format('DD/MM');
          }
          return dayjs(value, 'DD/MM/YYYY').format('DD/MM');
        },
        style: {
          colors: '#888888',
          fontSize: '12px',
          fontWeight: 590,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    series: [
      {
        name: 'series1',
        data: result.map((item) => item[filterType]),
      },
    ],
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'linear',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 250,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true,
        zoomedArea: {
          fill: {
            color: '#90CAF9',
            opacity: 0.4,
          },
          stroke: {
            color: '#0D47A1',
            opacity: 0.4,
            width: 1,
          },
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: true,
      },
      labels: {
        formatter: function (value) {
          return numberFormater(value, 1);
        },
        style: {
          colors: ['#888888'],
          fontSize: '12px',
          fontWeight: 590,
        },
      },
      min: (min: any) => {
        return 0;
      },
      max: (max: any) => {
        return max;
      },
      forceNiceScale: true,
    },
    markers: {
      size: 4,
      strokeColors: colors.primary.DEFAULT,
      strokeOpacity: 0.2,
      strokeWidth: 8,
    },

    grid: {
      show: true,
      position: 'back',
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
      row: {
        colors: undefined,
        opacity: 0.5,
      },
      column: {
        colors: undefined,
        opacity: 0.5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const value = formatNumber(series[seriesIndex][dataPointIndex], 0);
        const formatTime = categories[dataPointIndex];
        const time: string = dayjs(formatTime, 'DD/MM/YYYY').format(
          'DD/MM/YYYY'
        );
        const dataIndex = w.globals.categoryLabels[dataPointIndex];
        if (value && typeof time === 'string') {
          const firstTime =
            filter === 'all'
              ? `01/${dataIndex}`
              : dayjs(dataIndex, 'DD/MM').startOf('month').format('DD/MM');
          return (
            '<div class="">' +
            '<div class="bg-gray-15 dark:bg-dark-2 lg:p-2 p-3 rounded-[10px] border-none outline-none">' +
            '<div class="text-dark-4 text-xxs mb:text-sm border-b py-1 px-2">' +
            (isShowWeekTime || filter === 'm'
              ? firstTime
                ? `${firstTime} - `
                : ''
              : '') +
            time +
            '</div>' +
            '<div class="text-dark-3 text-xs mt-1 px-2 ">' +
            t(
              BTN_FILTERS.find((item) => item.value === filterType)?.title ||
                'merchant:mass'
            ) +
            '<div>' +
            '<div class="text-primary font-semibold text-base">' +
            value +
            (filterType !== 'count'
              ? '<span class="mx-1">VNST</span>'
              : '' + '</div>') +
            (filterType !== 'count'
              ? '<div class="text-dark-4 text-xs">' +
                convertMoney(
                  'VNST',
                  marketPrice,
                  series[seriesIndex][dataPointIndex]
                ) +
                '</div>' +
                '</div>' +
                '</div>'
              : '')
          );
        }
      },
      onDatasetHover: {
        highlightDataSeries: false,
      },
      intersect: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.8,
        opacityTo: 0,
        gradientToColors: [
          colors.primary.DEFAULT,
          colors.primary.DEFAULT,
          colors.primary.DEFAULT,
        ],
        type: 'vertical',
      },
    },
    colors: [
      colors.primary.DEFAULT,
      colors.primary.DEFAULT,
      colors.primary.DEFAULT,
    ],
  };
  return (
    <div className='h-full w-full'>
      <div className='mx-10 h-4 rounded-t-xxl bg-primary-light opacity-30'></div>
      <div className='mx-4 h-4 rounded-t-xxl bg-primary-light opacity-50'></div>
      <div className='flex w-full flex-col items-end justify-start rounded-xxl bg-white pt-5 shadow-lg'>
        <div className='flex-rows flex  w-full items-center justify-start gap-x-2 px-2 sm:justify-end sm:gap-x-4 lg:px-8'>
          {BTN_FILTERS.map((item) => (
            <Button
              size='sm'
              key={item.value}
              variant={item.value === filterType ? 'primary' : 'chip'}
              onClick={() =>
                setFilterType(item.value as 'notionalValue' | 'count')
              }
              className={clsx('!px-2 sm:!px-4', {
                'whitespace-nowrap break-keep ': item.value !== filterType,
              })}
            >
              {t(item.title)}
            </Button>
          ))}
          <div>
            <FilterDate
              setReferenceElement={setReferenceElement}
              popupRef={popupRef}
              referenceElement={referenceElement}
              filter={filter}
              setFilter={setFilter}
            />
          </div>
        </div>
        <div className='h-max w-full rounded-b-xxl bg-white'>
          <ReactECharts option={option} />
        </div>
      </div>
    </div>
  );
};

export default MerchantChart;
