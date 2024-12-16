export const getRangeFromYesterdayToNow = () => {
  const now = new Date();
  const endOfYesterday = new Date();

  endOfYesterday.setDate(endOfYesterday.getDate() - 1);
  endOfYesterday.setHours(23, 59, 59, 999);

  return { endOfYesterday, now };
};
