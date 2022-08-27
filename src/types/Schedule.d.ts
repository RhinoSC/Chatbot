import Run from "./Run";

export default interface Schedule {
    _id: string;
    name: string;
    start: number;
    end: number;
    rows: Run[]
}