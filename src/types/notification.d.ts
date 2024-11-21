export type NOTIFICATION_TYPE = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  read: boolean;
  type: 'mint' | 'redeem';
  wallet: string;
  readAll?: boolean;
  metadata: {
    amountIn: number;
    amountOut: number;
    timestamp?: number;
    transactionHash?: string;
  };
  transaction?: boolean;
};
