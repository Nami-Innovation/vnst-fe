import { defineChain } from 'viem';

export const victionTestnet = /*#__PURE__*/ defineChain({
  id: 89,
  name: 'Viction Testnet',
  network: 'viction-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'VIC',
    symbol: 'VIC',
  },
  rpcUrls: {
    default: { http: ['https://rpc-testnet.viction.xyz'] },
    public: { http: ['https://rpc-testnet.viction.xyz'] },
  },
  blockExplorers: {
    etherscan: { name: 'BscScan', url: 'https://testnet.vicscan.xyz/' },
    default: { name: 'BscScan', url: 'https://testnet.vicscan.xyz/' },
  },
  //   contracts: {
  //     multicall3: {
  //       address: '0xca11bde05977b3631167028862be2a173976ca11',
  //       blockCreated: 17422483,
  //     },
  //   },
  testnet: true,
});
