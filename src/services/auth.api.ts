import { Wallet } from '@/@type/wallet.type';
import axios from '@/utils/axios.base';
import { Address } from 'viem';

type AuthBody = {
  walletAddress: Address;
  signature: Address;
};

type AuthResult = {
  accessToken: string;
  wallet: Wallet;
};

export const login = async (body: AuthBody) => {
  const res = await axios.post<AuthResult>('/auth/login', body);
  return res.data;
};

export const getNonce = async (walletAddress: string) => {
  const res = await axios.get<{ nonce: string }>('/auth/nonce', {
    params: { walletAddress },
  });
  return res.data.nonce;
};
