import { Address } from '@ton/core';
import { JettonWallet } from './JettonWallet';

export class VNSTJettonMinter extends JettonWallet {
  static readonly VNST_OPCODES = {
    MINT: 0xa3b1f2c4,
    REDEEM: 0x5f9e8d7a,
  };

  constructor(address: Address) {
    super(address);
  }

  static createFromAddress(address: Address) {
    return new VNSTJettonMinter(address);
  }
}
