import React, { useEffect, useState } from "react";
import moment from "moment-timezone";

const Timer = ({}) => {
  const [remainingTime, setRemainingTime] = useState("");
  useEffect(() => {
    let timer = null;

    const calculateRemainingTime = () => {
      const now = moment().tz("America/New_York");
      const endOfDay = moment().tz("America/New_York").endOf("day");
      const duration = moment.duration(endOfDay.diff(now));
      const hours = duration.hours().toString().padStart(2, "0");
      const minutes = duration.minutes().toString().padStart(2, "0");
      const seconds = duration.seconds().toString().padStart(2, "0");
      setRemainingTime(`${hours}:${minutes}:${seconds}`);
    };

    calculateRemainingTime();
    timer = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return <span>{remainingTime}</span>;
};

export default Timer;