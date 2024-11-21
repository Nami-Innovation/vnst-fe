import { Address, toNano } from '@ton/core';
import { CHAIN } from '@tonconnect/ui-react';

export const TON_VNST_ADDRESS = Address.parse(
  process.env.NEXT_PUBLIC_TON_VNST_ADDRESS || ''
);

export const TON_USDT_ADDRESS = Address.parse(
  process.env.NEXT_PUBLIC_TON_USDT_ADDRESS || ''
);

export const TON_SCAN_URL =
  process.env.NEXT_PUBLIC_TON_SCAN_URL || 'https://testnet.tonviewer.com';

export const JETTON_CONFIGS = {
  USDT: {
    address: TON_USDT_ADDRESS,
    decimals: 6,
  },
  VNST: {
    address: TON_VNST_ADDRESS,
    decimals: 6,
  },
};

export const JETTON_TRANSFER_GAS_FEES = toNano('0.038');

export const isMainnet = process.env.NEXT_PUBLIC_IS_MAINNET === 'true';

export const TON_DECIMALS = 9;
