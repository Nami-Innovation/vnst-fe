import { Address } from 'viem';

export type Wallet = {
  _id: string;
  walletAddress: Address;
  email?: string;
  enabledNoti: boolean;
  balance: number;
  nonce?: string;
  isVerified: boolean;
};
