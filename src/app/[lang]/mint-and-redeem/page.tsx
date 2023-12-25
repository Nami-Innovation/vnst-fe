'server-only';

import MintRedeem from '@/components/mint-and-redeem';
import PriceChart from '@/components/mint-and-redeem/PriceChart';
import TransactionHistory from '@/components/mint-and-redeem/TransactionHistory';

type Props = {
  params: { lang: string };
};

export default async function MintRedeemPage({ params: { lang } }: Props) {
  return (
    <>
      <div className='grid grid-cols-12 gap-x-7 gap-y-10'>
        <div className='order-2 col-span-12 lg:order-1 lg:col-span-7 xl:col-span-8'>
          <div className='w-full'>
            <PriceChart />
          </div>
          <TransactionHistory />
        </div>
        <div className='order-1 col-span-12 lg:order-2 lg:col-span-5 xl:col-span-4'>
          <MintRedeem />
        </div>
      </div>
    </>
  );
}
