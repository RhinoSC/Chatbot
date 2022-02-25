import { horaroAPI } from "../cfg/horaro-api";
import { twitchAPI } from "../cfg/twitch-api";
const socket = require("../cfg/socket-context").get();

module.exports = async (args: any[], horarioAPI: horaroAPI, twitchAPI: twitchAPI) => {
    let text;
    let items = await horarioAPI.getRows();
    let max = items.length;
    let counter = horarioAPI.getCounter() + 1;
    horarioAPI.setMax(max);

    if (!horarioAPI.getActive()) {
        horarioAPI.start(horarioAPI.getMax())
    };

    if (counter == horarioAPI.getMax()) {
        horarioAPI.reset()
        return;
    }

    let flag;
    let value;
    if (args) {
        flag = args[0];
        value = args[1];
    }
    switch (flag) {
        case '-b':
            {
                if (!horarioAPI.setCounter(counter - 2)) {
                    return 'No se puede retroceder más';
                }
                counter = horarioAPI.getCounter() + 1
                if (socket) {
                    socket.emit('back')
                }
                break;
            }
        case '-m':
            {
                let game = await horarioAPI.getRowByName(args.join(' ').substring(flag.length + 1));
                counter = game!.indexs[0];
                if (socket) {
                    socket.emit('manualAdvance', counter)
                }
                break;
            }
        case '-n':
            {
                if (horarioAPI.setCounter(parseInt(value))) {
                    counter = horarioAPI.getCounter() + 1
                    if (socket) {
                        socket.emit('manualAdvance', counter)
                    }
                }
                break;
            }

        default: {
            if (socket) {
                socket.emit('advance')
            }
            break;
        }
    }

    const columns = await horarioAPI.getColumns();

    const row = await horarioAPI.getRowById(counter);

    const twitchGameTitle = horarioAPI.formatString(row.data[columns.findIndex((column: string) => column == 'Juego')])
    const twitchGame = horarioAPI.formatString(row.data[columns.findIndex((column: string) => column == 'hiddenGame')])
    const runners = horarioAPI.formatString(row.data[columns.findIndex((column: string) => column == 'hiddenRunner')])


    let title = `${process.env.STREAM_TITLE} ${twitchGameTitle} por ${runners}`
    let gameId = await twitchAPI.getGame(twitchGame);
    let status;

    if (gameId.data[0]) {
        status = await twitchAPI.setStream(title, gameId.data[0].id);
    } else {
        status = await twitchAPI.setTitle(title);
    }

    if (status == 204) {
        text = 'Hecho.'
        horarioAPI.setCounter(counter + 1);
    }

    return text;
}