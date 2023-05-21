export function extractDate(dateTime) {
    return dateTime.substring(0, dateTime.indexOf('T'));
}

export function extractDateWithWeekday(dateTime) {
    if (dateTime == undefined) {
        return '';
    }
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const dt = new Date(dateTime);
    const dayOfWeek = days[dt.getDay()];
    const date = extractDate(dateTime);
    return `${dayOfWeek} ${date}`;
}