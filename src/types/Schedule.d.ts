import ScheduleRow from "./ScheduleRow";
import Run from "./Run";

export default interface Schedule {
    _id: string;
    name: string;
    start: number;
    end: number;
    rows: ScheduleRow[];
    availableRuns: Run[];
    eventId: string;
    defaultSetup: number;
}