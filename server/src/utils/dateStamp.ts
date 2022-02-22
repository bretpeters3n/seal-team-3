export const dateStamp = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dateStamp = new Date();
  const year = dateStamp.getFullYear();
  const date = dateStamp.getDate();
  const monthIndex = dateStamp.getMonth();
  const monthName = months[monthIndex];
  let hours = dateStamp.getHours();
  const minutes = dateStamp.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesWLeadingZero = minutes < 10 ? '0' + minutes : minutes;
  const timeStamp = `${monthName} ${date}, ${year} at ${hours}:${minutesWLeadingZero}${ampm}`;
  return timeStamp;
};
