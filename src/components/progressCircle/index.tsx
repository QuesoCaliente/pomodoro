import React, { useCallback, useEffect, useState } from "react";
import useSettings from "../../utils/hooks/useSettings";

export default function ProgressCircle({
  type = "pomodoro",
}: {
  type: "pomodoro" | "shortBreak" | "longBreak";
}) {
  const settings = useSettings();
  const [secondsLeft, setSecondsLeft] = useState(
    settings?.settings.time[type]! * 60
  );
  const [isPaused, setIsPaused] = useState(true);

  const tick = () => {
    setSecondsLeft((prev) => prev - 1);
  };

  const initTimer = () => {
    setSecondsLeft(settings?.settings.time[type]! * 60);
  };

  const actionTimer = () => {
    if (isPaused && secondsLeft > 0) {
      setIsPaused(false);
    } else if (isPaused && secondsLeft === 0) {
      initTimer();
      setIsPaused(false);
    } else {
      setIsPaused(true);
    }
  };

  const percentaje =
    (secondsLeft / (settings?.settings.time[type]! * 60)) * 100;

  useEffect(() => {
    const timerId = setInterval(() => {
      if (isPaused) return;

      if (secondsLeft === 0) {
        clearInterval(timerId);
        setIsPaused(true);
        var audio = new Audio("twinbell.ogg");
        audio.play();
        return;
      }
      tick();
    }, 1000);

    return () => clearInterval(timerId);
  }, [settings?.settings.time, isPaused, secondsLeft]);

  useEffect(() => {
    initTimer();
  }, [settings?.settings.time]);

  return (
    <div className="relative h-[300px] w-[300px]">
      <div className="bs-progress h-[300px] w-[300px]  rounded-[50%] bg-brand-bg-200 p-[20px]">
        <div className="bs-progress-inset flex h-[260px] w-[260px] flex-col items-center justify-center rounded-[50%]">
          <span
            className={`${settings?.settings.font} text-[80px] font-bold text-brand-gray-200`}
          >
            {Math.floor(secondsLeft! / 60)}:
            {secondsLeft! % 60 < 10
              ? "0" + (secondsLeft! % 60)
              : secondsLeft! % 60}
          </span>
          <span
            onClick={() => actionTimer()}
            className={`${settings?.settings.font} z-[1] cursor-pointer text-[14px] font-bold tracking-[13px] text-brand-gray-200`}
          >
            {isPaused && secondsLeft === 0
              ? "RESTART"
              : isPaused
              ? "START"
              : "PAUSE"}
          </span>
        </div>
      </div>
      <svg
        className="absolute top-0 left-0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="300px"
        height="300px"
      >
        <circle
          className={`progress-circle ${settings?.settings.color.stroke}`}
          style={{ strokeDashoffset: percentaje * 8.75 }}
          cx="150"
          cy="150"
          r="140"
          transform="rotate(-90 150 150)"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
