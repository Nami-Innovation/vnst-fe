'use client';

import React from 'react';
import ApexCharts from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { useIsTablet } from '@/hooks/useMediaQuery';
export interface IProps {
  option: ApexOptions;
}

const ReactECharts = ({ option }: IProps): JSX.Element => {
  const isTablet = useIsTablet();
  return (
    <ApexCharts
      options={option}
      series={option.series}
      type='area'
      height={isTablet ? 300 : 350}
    />
  );
};

export default ReactECharts;
