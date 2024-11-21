import { ChartData } from '@/@type/price-chart.type';
import axios from '@/utils/axios.base';
import { Chain } from '@/web3/constants';

export const getChartData = async (
  token: string,
  range: string,
  network?: Chain
) => {
  const res = await axios.get<ChartData[]>('/token-price/chart', {
    params: {
      token,
      range,
      network,
    },
  });
  return res.data;
};
