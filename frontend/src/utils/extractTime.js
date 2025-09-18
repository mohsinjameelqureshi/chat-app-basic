export function extractTime(dateString) {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = padZero(date.getMinutes());

  // Determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24h → 12h format
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12

  return `${hours}:${minutes} ${ampm}`;
}

function padZero(num) {
  return num.toString().padStart(2, "0");
}
