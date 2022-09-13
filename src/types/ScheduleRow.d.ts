import Run from "./Run";

export default interface ScheduleRow {
    _id: string;
    dayRow: boolean;
    newDay: boolean;
    dayText: string;
    time: string;
    row: Run;
}