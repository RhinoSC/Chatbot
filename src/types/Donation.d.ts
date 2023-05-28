export default interface Donation {
    _id: string;
    name: string;
    email: string;
    time: number;
    amount: number;
    description: string;
    toBid: boolean;
    runId: string;
    bidId: string;
    optionName: string;
    eventId: string;
}