import { horaroAPI } from "../cfg/horaro-api";
import { twitchAPI } from "../cfg/twitch-api";

module.exports = async(args: any[], horarioAPI:horaroAPI, twitchAPI:twitchAPI) => {
    let text;

    // TO DO: implementar flags
    console.log('llegue a titulo');
    
    let status = await twitchAPI.setTitle(args.join(' '))
    if (status == 204) {
        text = 'titulo modificado.'
    } else {
        text = 'error'
    }

    return text;
}