"use client";
import { useEffect, useState } from "react";

export default function Countdown() {
  const targetDate = new Date(Date.parse("17 August 2024"));
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function calculateTimeRemaining() {
    const targetTime = new Date(targetDate).getTime();
    const currentTime = new Date().getTime();

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const currentTimeToDay = currentDate.getTime();

    const timeDifference = targetTime - currentTime;
    const timeDifferenceToDay = targetTime - currentTimeToDay;

    if (timeDifference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeDifferenceToDay / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  return (
    <div className="bg-secondary-0">
      <div className="container mx-auto text-secondary-2 flex flex-col lg:flex-row gap-2 lg:gap-4 items-center justify-center py-4">
        <div>Faltam apenas:</div>
        <div className="gap-2 font-bold flex text-3xl lg:text-4xl">
          <div>{`${timeRemaining.days} dias`}</div>
          <div>{`${timeRemaining.hours}h`}</div>
          <div>{`${timeRemaining.minutes}m`}</div>
          <div>{`${timeRemaining.seconds}s`}</div>
        </div>
        <div>para o grande dia!</div>
      </div>
    </div>
  );
}
