import Team from "./Team";
import Bid from "./Bid"

export default interface Run {
    _id: string;
    name: string;
    gameTwitch: string;
    start: number;
    estimate: number;
    estimateS: string;
    setup: number;
    teams: Team[];
    bids: Bid[],
    scheduleId: string
    category: string;
    platform: string;
    note: string;
}