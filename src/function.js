export const convertTimeZone = (date, timezone) => {
    const inputDate = new Date(date); // Renamed to avoid conflict

    const options = {
        timeZone: timezone || 'UTC', // Default to 'UTC' if timezone is undefined or null
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };

    const formatter = new Intl.DateTimeFormat([], options);
    const formattedDate = formatter.format(inputDate);

    return formattedDate;
};

let base = "";
if (process.env.NODE_ENV === "development") {
    base = "http://localhost:3001/";
} else {
    base = "https://dashboardtemperatureserver-production.up.railway.app/";

}
export let base_url = base;

