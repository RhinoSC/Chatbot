import Event from "./Event";

export default interface InternalSchedule {
    _id: string;
    name: string;
    event: Event;
    columns: string[];
    hiddenColumns: string[];
}