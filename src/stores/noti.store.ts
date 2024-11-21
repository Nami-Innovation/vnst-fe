import { create } from 'zustand';
import { produce } from 'immer';
import {
  getNotificationList,
  updateReadNotify,
} from '@/services/notification.api';
import { NOTIFICATION_TYPE } from '@/types/notification';

type Store = {
  notiList: NOTIFICATION_TYPE[];
  total: number;
  load: (params: { limit: number; offset: number }) => Promise<void>;
  updatedRead: (_id: string) => Promise<any>;
  reset: () => void;
};

const useNotiStore = create<Store>()((set) => ({
  notiList: [],
  total: 0,
  reset: () => {
    set(
      produce((state) => {
        state.notiList = [];
        state.total = 0;
      })
    );
  },
  load: async (_params) => {
    try {
      const res = await getNotificationList(_params);
      set(
        produce((state) => {
          state.notiList = [...state.notiList, ...res.rows];
          state.total = res.total;
        })
      );
    } catch (error) {
      console.log(error);
    }
  },

  updatedRead: async (_id) => {
    const res = await updateReadNotify({ read: true }, _id);
    set(
      produce((state) => {
        state.notiList = state.notiList.map((item: any) => {
          if (item._id === _id) {
            item.read = true;
          }
          return item;
        });
      })
    );
    return res;
  },
}));

export default useNotiStore;
