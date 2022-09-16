import Event from "./Event";

export default interface ExternalSchedule {
    _id: string;
    name: string;
    event: Event;
    columns: string[];
    hiddenColumns: string[];
}