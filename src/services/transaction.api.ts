import { ResponsePagination } from '@/@type/common.type';
import { Transaction } from '@/@type/transaction.type';
import axios from '@/utils/axios.base';

export const getTransactionLogs = async (
  methods: string[],
  page: number,
  limit?: number
) => {
  if (!limit) limit = 10;

  const res = await axios.get<ResponsePagination<Transaction>>(
    '/transaction-log',
    {
      params: {
        method: methods.join(','),
        page,
        limit,
        sort: 'desc',
      },
    }
  );

  return res.data;
};
