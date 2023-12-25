import { ResponsePagination } from '@/@type/common.type';
import { EventLog } from '@/@type/event-log.type';
import axios from '@/utils/axios.base';

export const getEventLogs = async (
  events: string[],
  page: number,
  limit: number = 10,
  walletAddress?: string
) => {
  if (!limit) limit = 10;

  const res = await axios.get<ResponsePagination<EventLog>>('/event-logs', {
    params: {
      event: events.join(','),
      page,
      limit,
      sort: '-blockNumber',
      walletAddress,
    },
  });

  return res.data;
};

type QueryEventLogsByTransaction = {
  blockHash: string;
  transactionHash: string;
  blockNumber: number;
};

export const getEventLogsByTransaction = async (
  query: QueryEventLogsByTransaction
) => {
  const res = await axios.get<EventLog[]>('/event-logs/by-transaction', {
    params: query,
  });

  return res.data;
};
