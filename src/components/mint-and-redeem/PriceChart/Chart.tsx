'use client';

import React, { useMemo } from 'react';
import ApexCharts from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { formatNumber } from '@/utils/format';
import colors from '@/colors';
import dayjs from '@/lib/dayjs';
import usePriceChartStore from '@/stores/price-chart.store';
import useLang from '@/hooks/useLang';
import { apexLocales } from '@/utils/apexcharts';

const Chart = () => {
  const lang = useLang();
  const [inverted, data, setDataPointIndex, range] = usePriceChartStore(
    (state) => [
      state.inverted,
      state.data,
      state.setDataPointIndex,
      state.range,
    ]
  );

  const series: ApexAxisChartSeries = useMemo(
    () => [
      {
        name: 'Price',
        data: data.map((item) => ({
          x: item.timestamp + (range === 'd' ? 1 * 1000 : 0),
          y: inverted ? 1 / item.price : item.price,
        })),
      },
    ],
    [data, inverted]
  );

  const options: ApexOptions = useMemo((): ApexOptions => {
    const nums = series[0].data.map((item: any) => item.y);

    const minY = nums.length > 0 ? Math.min(...nums) : 0;
    const maxY = nums.length > 0 ? Math.max(...nums) : 0;

    return {
      colors: [colors.primary.DEFAULT],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 1,
          opacityTo: 1,
          colorStops: [
            {
              color: '#01C096',
              opacity: 0.4,
              offset: 0,
            },
            {
              color: colors.primary.DEFAULT,
              opacity: 0.2,
              offset: 50,
            },
            {
              color: colors.primary.dark,
              opacity: 0,
              offset: 100,
            },
          ],
          //   stops: [100, 50, 0],
          type: 'vertical',
        },
      },
      theme: {
        mode: 'light',
      },
      chart: {
        type: 'area',
        toolbar: {
          show: false,
        },
        fontFamily: 'inherit',
        offsetX: 0,
        offsetY: 0,
        events: {
          mouseMove: (e, chart, options) => {
            if (options.dataPointIndex >= 0) {
              setDataPointIndex(options.dataPointIndex);
            }
          },
          markerClick: (e, chart, options) => {
            if (options.dataPointIndex >= 0) {
              setDataPointIndex(options.dataPointIndex);
            }
          },
          mouseLeave: () => {
            setDataPointIndex(-1);
          },
        },
        zoom: {
          enabled: false,
        },
        defaultLocale: lang,
        locales: apexLocales,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
        fill: {
          type: 'gradient',
          gradient: {
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            colorStops: [
              {
                color: colors.primary.dark,
                opacity: 1,
                offset: 0,
              },

              {
                color: colors.primary.DEFAULT,
                opacity: 1,
                offset: 52,
              },
              {
                color: colors.primary.light,
                opacity: 1,
                offset: 100,
              },
            ],
          },
        },
      },
      yaxis: {
        labels: {
          formatter(val, opts) {
            return formatNumber(val, inverted ? 8 : 2);
          },
          style: {
            colors: colors.dark[4],
            fontSize: '12px',
          },
        },
        axisBorder: {
          show: true,
          color: colors.dark[2],
          width: 1,
        },
        forceNiceScale: true,
        min: minY - minY * 0.002,
        max: maxY + maxY * 0.002,
      },
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeUTC: false,
          style: {
            colors: colors.dark[4],
            fontSize: '12px',
          },
        },
        axisBorder: {
          show: true,
          color: colors.dark[2],
          strokeWidth: 1,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      tooltip: {
        theme: undefined,
        custom: function ({ seriesIndex, dataPointIndex, w }) {
          const item = series[seriesIndex].data[dataPointIndex] as any;
          if (!item) return null;
          return (
            '<div class="bg-black">' +
            '<div class="text-xs text-dark-3">' +
            dayjs(item.x).locale(lang).format('lll') +
            '</div>' +
            '<div class="text-primary font-semibold mt-2">' +
            formatNumber(item.y, inverted ? 8 : 3) +
            ' USDT/VNST' +
            '</div>' +
            '</div>'
          );
        },
      },
      markers: {
        size: nums.length > 1 ? 0 : 5,
        strokeColors: colors.primary.DEFAULT,
        strokeOpacity: 0.5,
        strokeWidth: 8,
        hover: {
          size: undefined,
          sizeOffset: nums.length > 1 ? 5 : 2,
        },
      },
      grid: {
        yaxis: {
          lines: {
            show: true,
          },
        },
        borderColor: colors.dark[2],
      },
    };
  }, [series, lang]);

  return (
    <div className='pl-0 pr-2 md:pl-1.5 md:pr-4'>
      <ApexCharts options={options} series={series} type='area' height={360} />
    </div>
  );
};

export default Chart;
