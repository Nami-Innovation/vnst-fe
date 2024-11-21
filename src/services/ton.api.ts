import { ResponsePagination } from '@/@type/common.type';
import { TonTransaction, TonTransactionType } from '@/@type/transaction.type';
import axios from '@/utils/axios.base';
import { Address } from '@ton/core';

type QueryTonTransactions = {
  page: number;
  limit: number;
  type?: TonTransactionType;
  walletAddress?: string;
};

export const getTonTransactions = async (query: QueryTonTransactions) => {
  const res = await axios.get<ResponsePagination<TonTransaction>>(
    '/ton/transactions',
    {
      params: query,
    }
  );

  res.data.rows = res.data.rows.map((item) => {
    return {
      ...item,
      fromAddress: Address.parse(item.fromAddress).toString(),
      toAddress: Address.parse(item.toAddress).toString(),
    };
  });

  return res.data;
};
