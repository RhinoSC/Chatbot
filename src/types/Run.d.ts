import Team from "./Team";

export default interface Run {
    _id: string;
    name: string;
    start: number;
    estimate: string;
    estimateS: number;
    teams: Team[];
    data: { category: string, platform: string, note: string };
    bids: [bidId: string]
}