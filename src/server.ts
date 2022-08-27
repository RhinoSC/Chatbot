require('dotenv').config()
import cors from 'cors';
import express, { Request, Response } from 'express';
import { Server } from "socket.io";
import socketContext from './cfg/socket-context';

import { DB } from './cfg/db/chat/db';
import { horaroAPI } from './cfg/horaro-api';
import { TmiChat } from './cfg/tmi-client';
import { twitchAPI } from './cfg/twitch-api';
import { CommandController } from './controllers/Command.controller';
import { TimerController } from './controllers/Timer.controller';
import { HoraroController } from './controllers/Horaro.controller';
import { neDB } from './cfg/db/eventDb/nedb';
import { EventRepository } from './repository/eventDb/event.repository';

class ServerBot {
    private app: express.Application;
    private chatDB: DB;
    private horarioAPI: horaroAPI;
    private twitchAPI: twitchAPI;
    private tmi: TmiChat;
    private neDB: neDB;

    private commandController: CommandController;
    private timerController: TimerController;
    private horaroController: HoraroController;

    constructor() {
        this.app = express();
        this.chatDB = new DB('./chatbot.db');
        this.horarioAPI = new horaroAPI();
        this.twitchAPI = new twitchAPI();
        this.tmi = new TmiChat(this.chatDB.getDb(), this.horarioAPI, this.twitchAPI);
        this.neDB = new neDB()

        this.commandController = new CommandController(this.chatDB.getDb(), this.tmi);
        this.timerController = new TimerController(this.chatDB.getDb(), this.tmi)
        this.horaroController = new HoraroController();

        this.configuration();
        this.routes();
    }

    public configuration() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express.json())
        this.app.use(cors())
    }

    public routes() {
        this.app.use('/api/commands/', this.commandController.router);
        this.app.use('/api/timers/', this.timerController.router);
        this.app.use('/api/horaro/', this.horaroController.router);
        this.app.get("/", (req: Request, res: Response) => {
            res.send('Hello world!');
        })
    }

    public async start() {
        await this.twitchAPI.init()
        const io = new Server(this.app.listen(this.app.get('port'), () => {
            console.log(`Server is listening ${this.app.get('port')} port.`);
        }), {
            cors: {
                // origin: "*",
                origin: "http://localhost:8080",
                methods: ["GET", "POST"],
                credentials: true
            },
            allowEIO3: true
        });

        io.on('connection', (socket) => {
            console.log('a user connected');
            io.emit('getCounter', this.horarioAPI.getCounter())
        });

        // io.on('getCounter', (socket) => {
        //     console.log('holaaaa');

        // })

        socketContext.set(io);
        this.tmi.start()




        // testing nedb
        // let event = {
        //     name: 'test2',
        // }
        // const a = await this.eventDB.addNewEvent(event)

        // let eventRepo: EventRepository = new EventRepository(this.neDB.db.event)

        // let res = await eventRepo.findEvents()
        // console.log(res)

        // let b = await this.eventDB.findEventByName('test2')
        // console.log(b)
        // let res = await this.eventDB.deleteEvent(b[0]._id)

        // [{ name: string, _id: string }]
        // b = await this.eventDB.updateEvent(b[0]._id, event)
        // console.log(b)
        // this.eventDB.findEvent('esc5tDah5sDtmz2v').then((event: any) => {
        //     console.log(event)
        // }).catch(err => {
        //     console.error('hola')
        //     console.error(err)
        // })
    }

}

const server = new ServerBot();
server.start()