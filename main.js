function padZeroes(date){
const [hours , minutes ] = date.split(":");
return hours.padStart(2,'0') + ':' + minutes.padEnd(2,'0');
}

function sanitiseDate(date) {
  let sanitizedDate = date;
  let isPM = false;
  sanitizedDate = sanitizedDate.replace('.', ':')
  if(sanitizedDate.indexOf('PM') !== -1){
    isPM = true
  }
  sanitizedDate = sanitizedDate.replace('PM', '')
  sanitizedDate = sanitizedDate.replace('AM', '')
  if (sanitizedDate.includes(':')) {
    sanitizedDate = padZeroes(sanitizedDate);
  }
  else {
    sanitizedDate = sanitizedDate.padStart(2, '0')
    sanitizedDate = sanitizedDate.padEnd(5, ':00')
  }
  if(isPM){
    const [hours,minutes ] = sanitizedDate.split(":");
    const convertedHours = new String(parseInt(hours) + 12).padStart(2, '0');
    sanitizedDate = convertedHours + ":" + minutes;

  }
return sanitizedDate;
}


function getDifferenceBetweenDates(startTime, endTime){
const [startHours, startMinutes] = startTime.split(':')
const [endHours, endMinutes] = endTime.split(':')

const startDate = fromMidnightDate(startHours,startMinutes);
const endDate = fromMidnightDate(endHours, endMinutes);
if(startDate > endDate){
endDate.setHours(endDate.getHours() + 24);
}
  return  Math.abs(startDate - endDate);
}

function fromMidnightDate(hours, minutes){
  const date = new Date();
  date.setHours(
    hours===undefined ? 0 : hours,
    minutes===undefined ? 0 : minutes,
    0,0);

  return date;
}

function getPayRate({start_time,end_time, break_notes, pay_rate}){

  const [startBreak, endBreak] = break_notes.split('-');
  let sanitisedStartBreak = sanitiseDate(startBreak.trim())
  let sanitisedEndBreak = sanitiseDate(endBreak.trim())
  let sanitisedStartTime = sanitiseDate(start_time.trim())
  let sanitisedEndTime = sanitiseDate(end_time.trim())
 const firstWorkingTime = getDifferenceBetweenDates(sanitisedStartTime, sanitisedStartBreak);
 const secondWorkingTime = getDifferenceBetweenDates(sanitisedEndBreak, sanitisedEndTime);

const totalWorkingTime = (firstWorkingTime + secondWorkingTime) / 36e5;
return (totalWorkingTime * parseFloat(pay_rate)).toFixed(2)
};

function formatLine (line)  {
    let [break_notes,end_time,pay_rate,start_time] = line.split(',');
  return {break_notes, start_time, end_time, pay_rate}
  }

const csvLines = [
  "15-18,23:00,10,10:00",
"18.30-19.00,23:00,12,18:00",
"4PM-5PM,22:30,14,12:00",
"3-4,18:00,10,9:00",
"4-4.10PM,23:00,20,9:00",
"15 - 17,23:00,10,11:00",
"11 - 13,16:00,10,10:00",
"11AM - 2PM,4PM,10,10:00",
 "4AM - 5AM,6AM,10,8PM"
];


const labourData = csvLines.map(formatLine)

labourData.map(data => getPayRate(data))
