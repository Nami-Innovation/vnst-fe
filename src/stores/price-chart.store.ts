import { create } from 'zustand';
import { produce } from 'immer';
import { ChartData } from '@/@type/price-chart.type';
import { getChartData } from '@/services/token-price.api';
import dayjs, { Dayjs } from 'dayjs';
import { Chain } from '@/web3/constants';
import useChainStore from './chain.store';

type Store = {
  loading: boolean;
  data: ChartData[];
  currentTime: Dayjs;
  dataPointIndex: number;
  range: string;
  inverted: boolean;
  toggleInverted: (inverted?: boolean) => void;
  setRange: (range: string) => void;
  fetchData: (token: string, range: string, chain?: Chain) => Promise<void>;
  setDataPointIndex: (index: number) => void;
};

const usePriceChartStore = create<Store>()((set) => ({
  data: [],
  loading: false,
  currentTime: dayjs(),
  dataPointIndex: -1,
  range: 'd',
  inverted: false,
  toggleInverted: (inverted?: boolean) => {
    set(
      produce((state) => {
        state.inverted = inverted !== undefined ? inverted : !state.inverted;
      })
    );
  },
  setRange: (range) => {
    set({ range });
  },
  setDataPointIndex: (index: number) => {
    set({ dataPointIndex: index });
  },
  fetchData: async (token: string, range: string, chain?: Chain) => {
    set({ loading: true });
    try {
      const data = await getChartData(token, range, chain);
      const currentChain = useChainStore.getState().chain;
      if (chain === currentChain) {
        set({ data });
      }
    } catch (error) {}
    set({ loading: false });
  },
}));

export default usePriceChartStore;
