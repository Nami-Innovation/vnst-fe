import { Address } from 'viem';

export type TransactionInput = {
  name: string;
  type: 'BigNumber';
  hex: number;
};

export type Transaction = {
  _id: string;
  hash: Address;
  address: Address;
  blockNumber: number;
  from: Address;
  to: Address;
  method: string;
  inputs: TransactionInput[];
  createdAt: string;
  updatedAt: string;
  timeStamp: number;
  linkBsc: string;
};
