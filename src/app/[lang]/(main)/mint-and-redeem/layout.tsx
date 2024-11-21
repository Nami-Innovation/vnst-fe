export default function MintRedeemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mx-auto  bg-secondary-lightest px-4 pb-20 pt-[30px] xl:px-0'>
      {children}
    </div>
  );
}
