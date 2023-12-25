import axios from '@/utils/axios.base';

export const getOtcDelta = async () => {
  const res = await axios.get<{ otcDelta: number }>('/contract/otc-delta');

  return res.data.otcDelta;
};
