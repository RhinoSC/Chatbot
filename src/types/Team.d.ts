import User from "./User";

export default interface Team {
    _id: string;
    name: string;
    players: User[];
    runId: string;
}