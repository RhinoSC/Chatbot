export default interface Prize {
    _id: string;
    name: string;
    minAmount: number;
    imgUrl: string;
    eventId: string;
    active: boolean;
}