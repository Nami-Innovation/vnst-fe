import { create } from 'zustand';
import { produce } from 'immer';
import { ChartData } from '@/@type/price-chart.type';
import { getChartData } from '@/services/token-price.api';
import dayjs, { Dayjs } from 'dayjs';

type Store = {
  loading: boolean;
  data: ChartData[];
  currentTime: Dayjs;
  dataPointIndex: number;
  range: string;
  inverted: boolean;
  toggleInverted: (inverted?: boolean) => void;
  setRange: (range: string) => void;
  fetchData: (token: string, range: string) => Promise<void>;
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
    set(
      produce((state) => {
        state.range = range;
      })
    );
  },
  setDataPointIndex: (index: number) => {
    set(
      produce((state) => {
        state.dataPointIndex = index;
      })
    );
  },
  fetchData: async (token: string, range: string) => {
    set(
      produce((state) => {
        state.loading = true;
      })
    );
    try {
      const data = await getChartData(token, range);
      set(
        produce((state) => {
          state.data = data;
        })
      );
    } catch (error) {}
    set(
      produce((state) => {
        state.loading = false;
      })
    );
  },
}));

export default usePriceChartStore;
