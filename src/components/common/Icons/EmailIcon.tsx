const EmailIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      className={className}
    >
      <path
        d='m2.8 4.75 6.218 4.534a1.685 1.685 0 0 0 1.964 0L17.2 4.75M4.56 16h10.88c.896 0 1.344 0 1.686-.164.301-.143.546-.373.7-.655.174-.32.174-.74.174-1.581V6.4c0-.84 0-1.26-.174-1.581a1.554 1.554 0 0 0-.7-.656C16.784 4 16.336 4 15.44 4H4.56c-.896 0-1.344 0-1.686.163a1.554 1.554 0 0 0-.7.656C2 5.139 2 5.559 2 6.4v7.2c0 .84 0 1.26.174 1.581.154.282.399.512.7.655.342.164.79.164 1.686.164z'
        stroke='#888'
        strokeWidth='2'
      />
    </svg>
  );
};

export default EmailIcon;
