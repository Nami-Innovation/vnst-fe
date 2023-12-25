import { ChartData } from '@/@type/price-chart.type';
import axios from '@/utils/axios.base';

export const getChartData = async (token: string, range: string) => {
  const res = await axios.get<ChartData>('/token-price/chart', {
    params: {
      token,
      range,
    },
  });
  return res.data;
};
