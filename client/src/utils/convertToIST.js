const convertToIST = (utcTimestamp) => {
  const utcDate = new Date(utcTimestamp);
  const istTime = new Date(utcDate.getTime());

  const day = String(istTime.getDate()).padStart(2, "0");
  const month = String(istTime.getMonth() + 1).padStart(2, "0");
  const year = istTime.getFullYear();

  let hours = istTime.getHours();
  const minutes = String(istTime.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? " p.m." : " a.m.";
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${day}-${month}-${year}, ${hours}.${minutes}${ampm}`;
};

export default convertToIST;
