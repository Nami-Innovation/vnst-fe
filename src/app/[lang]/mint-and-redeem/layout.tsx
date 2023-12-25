export default function MintRedeemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mx-auto max-w-screen-xl px-4 pb-10 pt-8 lg:pb-24 xl:px-0'>
      {children}
    </div>
  );
}
