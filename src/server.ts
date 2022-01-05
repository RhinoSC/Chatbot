require('dotenv').config()
import cors from 'cors';
import express, { Request, Response } from 'express';
import { Server } from "socket.io";
import socketContext from './cfg/socket-context';

import { DB } from './cfg/db';
import { horaroAPI } from './cfg/horaro-api';
import { TmiChat } from './cfg/tmi-client';
import { twitchAPI } from './cfg/twitch-api';
import { CommandController } from './controllers/Command.controller';
import { TimerController } from './controllers/Timer.controller';
import { HoraroController } from './controllers/Horaro.controller';

class ServerBot {
    private app: express.Application;
    private DB: DB;
    private horarioAPI: horaroAPI;
    private twitchAPI: twitchAPI;
    private tmi: TmiChat;

    private commandController: CommandController;
    private timerController: TimerController;
    private horaroController: HoraroController;

    constructor() {
        this.app = express();
        this.DB = new DB();
        this.horarioAPI = new horaroAPI();
        this.twitchAPI = new twitchAPI();
        this.tmi = new TmiChat(this.DB.getDb(), this.horarioAPI, this.twitchAPI);

        this.commandController = new CommandController(this.DB.getDb(), this.tmi);
        this.timerController = new TimerController(this.DB.getDb(), this.tmi)
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

    public start() {

        const io = new Server(this.app.listen(this.app.get('port'), () => {
            console.log(`Server is listening ${this.app.get('port')} port.`);
        }), {
            cors: {
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
    }

}

const server = new ServerBot();
server.start()