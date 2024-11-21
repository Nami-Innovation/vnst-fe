type Key_Fee = '1' | '22' | '39' | '72' | '86' | '447';

export type ResponseChart = {
  interval: string;
  result: {
    _id: string;
    lastTimeUpdate: string;
    notionalValue: number;
    count: number;
    userCount: number;
    feeRevenueVndc: number;
    feeRevenueVnst: number;
    feeRevenueUsdt: number;
    feeRevenue: Record<Key_Fee, number>;
  }[];
};

export type ResponseAnalytics = {
  _id: string;
  notionalValue: number;
  lastTimeUpdate: string;
  count: number;
  feeRevenue: Record<Key_Fee, number>;
  userCount: number;
};

export type ParamsContribution = {
  page?: number;
  limit?: number;
  sort?: string;
  merchant?: string;
  from?: number;
  to?: number;
};

export interface ResponseContributionHistory {
  amount: number;
  chainId: number;
  createdAt: string;
  merchant: {
    code: string;
    name: string;
    walletAddress: string;
    _id: string;
  };
  token: string;
  transactionHash: string;
  updatedAt: string;
  _id: string;
}

export type ResponseTotalContribution = {
  usdt: number;
  vnst: number;
};

export interface ResponseLiquidData extends ResponseContributionHistory {
  type: 'OUT' | 'IN';
}

export interface ObjectMerchant {
  address: string;
  link: string;
  integrationDate: string;
  linkIOS: string;
  linkAndroid: string;
}
