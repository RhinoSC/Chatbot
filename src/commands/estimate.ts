import {toHHMMSS} from '../utils/string-format'

import { horaroAPI } from "../cfg/horaro-api";
import { twitchAPI } from "../cfg/twitch-api";

module.exports = async(args: any[], horarioAPI:horaroAPI, twitchAPI:twitchAPI) => {
    let text;
    if (!horarioAPI.getActive()) return 'No ha iniciado el horario.';

    // TO DO: implementar flags


    let row = await horarioAPI.getRowById(horarioAPI.getCounter()-1)
    text = Math.floor(row.length_t);

    return toHHMMSS(text);
}