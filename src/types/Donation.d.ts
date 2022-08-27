export default interface Donation {
    _id: string;
    name: string;
    email: string;
    time: string;
    amount: number;
    description: string;
    toBid: boolean;
    toBidArray: [{ bidId: string }];
    bids: [{ name: string, current: number }]
}