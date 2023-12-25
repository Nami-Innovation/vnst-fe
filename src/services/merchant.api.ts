import { IDataResponse } from '@/types/common';
import {
  ResponseChart,
  ResponseAnalytics,
  ParamsContribution,
  ResponseContributionHistory,
  ResponseTotalContribution,
  ResponseLiquidData,
} from '@/types/merchant';
import axios from '@/utils/axios.base';

export const getMerchantChart: (params: any) => Promise<ResponseChart> = async (
  params
) => {
  const res = await axios.get<ResponseChart>('/merchants/chart', {
    params,
  });
  return res.data;
};

export const getMerchantAnalytics: (
  params: any
) => Promise<ResponseAnalytics> = async (params) => {
  const res = await axios.get<ResponseAnalytics>('/merchants/analytic', {
    params,
  });
  return res.data;
};

export const getContributionHistory: (
  params: ParamsContribution
) => Promise<IDataResponse<ResponseContributionHistory>> = async (params) => {
  const res = await axios.get('/merchants/contribution-history', {
    params,
  });
  return res.data;
};

export const getTotalContribution: () => Promise<ResponseTotalContribution> =
  async () => {
    const res = await axios.get(
      '/merchants/contribution-history/total-contribution'
    );
    return res.data;
  };

export const getLiquidData: (
  params: ParamsContribution
) => Promise<IDataResponse<ResponseLiquidData>> = async (params) => {
  const res = await axios.get('/merchants/liquidity-support', { params });
  return res.data;
};

export const getTotalLiquid = async () => {
  const res = await axios.get('merchants/liquidity-support/total-liquidity');
  return res.data;
};
