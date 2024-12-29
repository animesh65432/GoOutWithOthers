import { eventstypes, DateOptions } from "../types"
const GroupingforSelectEvents = (data: eventstypes[]) => {
    const uniqueLocations = Array.from(new Set(data.map(item => item.loacation)));
    return uniqueLocations
}

const GroupingforSelectTime = (data: eventstypes[]) => {

    const formatToLocalDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };


    const uniqueTimes = Array.from(new Set(data.map(item => item.time.getTime())))
        .map(formatToLocalDate);


    return uniqueTimes;
};
function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    })
}



export function getDateOptions(): DateOptions {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const weekEnd = new Date(today);
    weekEnd.setDate(today.getDate() + (6 - today.getDay()));

    return {
        today,
        tomorrow,
        weekEnd
    };
}


export { GroupingforSelectEvents, GroupingforSelectTime, formatDate }