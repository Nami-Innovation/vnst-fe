import { create } from 'zustand';
import { produce } from 'immer';
import dayjs from '@/lib/dayjs';

type TQuery = {
  from: dayjs.Dayjs;
  to: dayjs.Dayjs;
  page: number;
};

type Store = {
  liquidQuery: TQuery;
  contribution: TQuery;
  setQueryLiquid: (params: Partial<TQuery>) => void;
  setQueryContribution: (params: Partial<TQuery>) => void;
};

const useMerchantStore = create<Store>()((set) => ({
  liquidQuery: {
    from: dayjs().startOf('month'),
    to: dayjs(),
    page: 1,
  },
  contribution: {
    from: dayjs().startOf('month'),
    to: dayjs(),
    page: 1,
  },
  setQueryLiquid: (params) =>
    set(
      produce((state: Store) => {
        state.liquidQuery = {
          ...state.liquidQuery,
          ...params,
        };
      })
    ),
  setQueryContribution: (params) =>
    set(
      produce((state: Store) => {
        state.contribution = {
          ...state.contribution,
          ...params,
        };
      })
    ),
}));

export default useMerchantStore;
