export function exportDateTimeForFilename(dateTime) {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    const formattedDateTime = `${year}${month}${day}_${hours}${minutes}${seconds}`;
    return formattedDateTime;
}

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

export function dateTimeWithWeekday(dateTime) {
    const date = new Date(dateTime);
    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = date.getHours() % 12 || 12;
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';
    const formattedDateTime = `${weekday} ${year}-${month}-${day} ${hours}:${minutes}${ampm}`;
    return formattedDateTime;
}
