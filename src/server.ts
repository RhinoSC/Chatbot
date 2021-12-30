require('dotenv').config()
const cors = require('cors');
import express, { Request, Response } from 'express';
import { DB } from './cfg/db';
import { horaroAPI } from './cfg/horaro-api';
import { TmiChat } from './cfg/tmi-client';
import { twitchAPI } from './cfg/twitch-api';
import { CommandController } from './controllers/Command.controller';
import { TimerController } from './controllers/Timer.controller';

class Server {
    private app: express.Application;
    private DB: DB;
    private horarioAPI: horaroAPI;
    private twitchAPI: twitchAPI;
    private tmi: TmiChat;

    private commandController: CommandController;
    private timerController: TimerController;

    constructor() {
        this.app = express();
        this.DB = new DB();
        this.horarioAPI = new horaroAPI();
        this.twitchAPI = new twitchAPI();
        this.tmi = new TmiChat(this.DB.getDb(), this.horarioAPI, this.twitchAPI);

        this.commandController = new CommandController(this.DB.getDb(), this.tmi);
        this.timerController = new TimerController(this.DB.getDb(), this.tmi)

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
        this.app.get("/", (req: Request, res: Response) => {
            res.send('Hello world!');
        })
    }

    public start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server is listening ${this.app.get('port')} port.`);
        })
        this.tmi.start()
    }

}

const server = new Server();
server.start()