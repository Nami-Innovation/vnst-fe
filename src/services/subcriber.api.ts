import axios from '@/utils/axios.base';

export type TParams = {
  name: string;
  email?: string;
  telegramId?: string;
};

export const subcriberMerchant = async (params: TParams) => {
  const res = await axios.post('/merchant-subscriber/subscriber', {
    ...params,
  });
  return res.data;
};
