import moment from "moment-timezone";

export function getGameNumber() {
  // August 10th, 2023 - start day of deployment
  const startDate = moment.tz("2024-03-10", "America/New_York").startOf("day");
  const currentDate = moment().tz("America/New_York");
  const daysPassed = currentDate.diff(startDate, "days");
  return daysPassed;
}
