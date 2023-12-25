import React, { useState, useEffect } from 'react';

// Five minutes 
const TimeCountDown = 300
const Countdown = ({
  className,
  onResend,
}: {
  className: string;
  onResend: () => void;
}) => {
  const [timeLeft, setTimeLeft] = useState(TimeCountDown);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      }
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, []);
  return (
    <div className={className}>
      {timeLeft <= 0 ? (
        <button
          className='underline-offset-1 hover:underline'
          onClick={() => {
            onResend();
            setTimeLeft(TimeCountDown);
          }}
        >
          Resend
        </button>
      ) : (
        <div>
          <span>0{Math.floor(timeLeft / 60)}:</span>
          <span>
            {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
          </span>
        </div>
      )}
    </div>
  );
};

export default Countdown;
