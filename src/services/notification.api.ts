import { IDataResponse } from '@/types/common';
import { NOTIFICATION_TYPE } from '@/types/notification';
import axios from '@/utils/axios.base';

export const getNotificationList: (params: {
  limit: number;
  offset?: number;
}) => Promise<IDataResponse<NOTIFICATION_TYPE>> = async (params) => {
  const res = await axios.get<IDataResponse<NOTIFICATION_TYPE>>(
    '/notifications',
    { params }
  );
  return res.data;
};

export const updateReadNotify: (
  params: {
    read: boolean;
  },
  id: string
) => Promise<any> = async (params, id) => {
  const res = await axios.put(`/notifications/${id}`, params);
  return res.data;
};

export const updateEmailNotify: (params: {
  email: string;
  enabledNoti?: boolean;
}) => Promise<any> = async (params) => {
  const res = await axios.put('/wallets/update-me', params);
  return res.data;
};

export const verifyEmail: (params: { email: string }) => Promise<any> = async (
  params
) => {
  const res = await axios.post('/wallets/verify-email', params);
  return res.data;
};

export const verifyOTP = async (params: { email: string; otp: string }) => {
  const res = await axios.put('/wallets/update-email', params);
  return res.data;
};
