import { horaroAPI } from "../cfg/horaro-api";
import { twitchAPI } from "../cfg/twitch-api";

module.exports = async(args: any[], horarioAPI:horaroAPI, twitchAPI:twitchAPI) => {

    let text;
    if (!(await horarioAPI.getActive())) return 'No ha iniciado el horario.';

    // TO DO: implementar flags


    let row = await horarioAPI.getRowById(horarioAPI.getCounter())
    let column = await horarioAPI.getColumnByName('Categoria');
    text = row.data[column]

    return horarioAPI.formatString(text);
}