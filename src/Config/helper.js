export function formatTo12Hour(timeString) {
  // Handle fractional seconds by trimming to milliseconds
  const cleanTime = timeString.split('.')[0]; 
  const date = new Date(cleanTime);

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12; // Convert 0 -> 12 for midnight
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}.${minutes} ${ampm}`;
}