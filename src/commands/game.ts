import { horaroAPI } from "../cfg/horaro-api";
import { twitchAPI } from "../cfg/twitch-api";

module.exports = async(args: any[], horarioAPI:horaroAPI, twitchAPI:twitchAPI) => {
    let text;

    // TO DO: implementar flags

    let gameId = await twitchAPI.getGame(args.join(' '))

    let status = await twitchAPI.setGame(gameId.data[0].id)
    if (status == 204) {
        text = 'categoría modificada.'
    }

    return text;
}