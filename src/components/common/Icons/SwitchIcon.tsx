const SwitchIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      {...props}
    >
      <path
        d='m2 7 8-5 8 5M2 13l8 5 8-5'
        stroke='#fff'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default SwitchIcon;
