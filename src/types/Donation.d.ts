import Run from "./Run";

export default interface Donation {
    _id: string;
    name: string;
    email: string;
    time: string;
    amount: number;
    description: string;
    toBid: boolean;
    runId: string;
    bidId: string;
    eventId: string;
}