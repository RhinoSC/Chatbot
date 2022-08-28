import Team from "./Team";

export default interface Run {
    _id: string;
    name: string;
    start: number;
    estimate: string;
    estimateS: number;
    setup: number;
    teams: Team[];
    bids: string[],
    scheduleId: string
    category: string;
    platform: string;
    note: string;
}