"use client";

import { Calendar } from "./ui/calendar";

export default function ArchiveCalendar() {
  const handleDayClick = (day) => {
    console.log(day);
  };

  return (
    <Calendar
      mode="single"
      onDayClick={handleDayClick}
      className="rounded-md border w-min"
    />
  );
}
