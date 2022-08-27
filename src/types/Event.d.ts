import Donation from "./Donation";
import Prize from "./Prize";
import Schedule from "./Schedule";

export default interface Event {
    _id: string;
    name: string;
    start: number;
    end: number;
    schedule: Schedule;
    donations: Donation[];
    prizes: Prize[],
}