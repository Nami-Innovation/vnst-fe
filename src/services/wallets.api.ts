import { Wallet } from '@/@type/wallet.type';
import axios from '@/utils/axios.base';

export const getAuthWallet = async () => {
  const res = await axios.get<Wallet>('/wallets/me');
  return res.data;
};
