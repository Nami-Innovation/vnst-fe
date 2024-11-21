import { Wallet } from '@/@type/wallet.type';
import axios from '@/utils/axios.base';
import {
  Account,
  ConnectAdditionalRequest,
  TonProofItemReplySuccess,
} from '@tonconnect/ui-react';
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

export const logout = async () => {
  await axios.post('/auth/logout');
};

export const getNonce = async (walletAddress: string) => {
  const res = await axios.get<{ nonce: string }>('/auth/nonce', {
    params: { walletAddress },
  });
  return res.data.nonce;
};

export const tonGeneratePayload =
  async (): Promise<ConnectAdditionalRequest | null> => {
    try {
      const res = await axios.get<{ payload: string }>(
        '/auth/ton/generate-payload'
      );
      return { tonProof: res.data.payload };
    } catch (error) {
      return null;
    }
  };

export const tonLogin = async (
  proof: TonProofItemReplySuccess['proof'],
  account: Account
) => {
  const reqBody = {
    address: account.address,
    network: account.chain,
    publicKey: account.publicKey,
    proof: {
      ...proof,
      stateInit: account.walletStateInit,
    },
  };
  const res = await axios.post<AuthResult>('/auth/ton/login', reqBody);
  return res.data;
};
