export default interface User {
    _id: string;
    name: string;
    teamId: string;
    social: { twitch: string };
}