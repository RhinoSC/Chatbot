require('dotenv').config()
import cors from 'cors';
import express, { Request, Response } from 'express';
import fs from 'fs'
import https from 'https';
import { Server } from "socket.io";
import socketContext from './cfg/socket-context';

import { DB } from './cfg/db/chat/db';
import { horaroAPI } from './cfg/horaro-api';
import { TmiChat } from './cfg/tmi-client';
import { twitchAPI } from './cfg/twitch-api';
import { CommandController } from './controllers/chat/Command.controller';
import { TimerController } from './controllers/chat/Timer.controller';
import { HoraroController } from './controllers/chat/Horaro.controller';
import { BidController } from './controllers/marathon/Bid.controller';
import { DonationController } from './controllers/marathon/Donation.controller';
import { EventController } from './controllers/marathon/Event.controller';
import { PrizeController } from './controllers/marathon/Prize.controller';
import { RunController } from './controllers/marathon/Run.controller';
import { ScheduleController } from './controllers/marathon/Schedule.controller';
import { TeamController } from './controllers/marathon/Team.controller';
import { UserController } from './controllers/marathon/User.controller';
import { neDBObject } from './cfg/db/neDb/nedb';
import { neDB } from './cfg/db/neDb/nedb.interface';

class ServerBot {
    private app: express.Application;
    private chatDB: DB;
    private horarioAPI: horaroAPI;
    // private twitchAPI: twitchAPI;
    // private tmi: TmiChat;
    private neDB: neDB;

    private controllers: {
        // commandController: CommandController,
        // timerController: TimerController,
        horaroController: HoraroController,
        bidController: BidController,
        donationController: DonationController,
        eventController: EventController,
        prizeController: PrizeController,
        runController: RunController,
        scheduleController: ScheduleController,
        teamController: TeamController,
        userController: UserController
    };

    constructor() {
        this.app = express();
        this.chatDB = new DB('./chatbot.db');
        this.horarioAPI = new horaroAPI();
        // this.twitchAPI = new twitchAPI();
        // this.tmi = new TmiChat(this.chatDB.getDb(), this.horarioAPI, this.twitchAPI);
        this.neDB = neDBObject

        this.controllers = {
            // commandController: new CommandController(this.chatDB.getDb(), this.tmi),
            // timerController: new TimerController(this.chatDB.getDb(), this.tmi),
            horaroController: new HoraroController(),

            bidController: neDBObject.controllers.bidController,
            donationController: neDBObject.controllers.donationController,
            eventController: neDBObject.controllers.eventController,
            prizeController: neDBObject.controllers.prizeController,
            runController: neDBObject.controllers.runController,
            scheduleController: neDBObject.controllers.scheduleController,
            teamController: neDBObject.controllers.teamController,
            userController: neDBObject.controllers.userController,
        }

        // this.commandController = new CommandController(this.chatDB.getDb(), this.tmi);
        // this.timerController = new TimerController(this.chatDB.getDb(), this.tmi)
        // this.horaroController = new HoraroController();

        //marathons

        this.configuration();
        this.routes();
    }

    public configuration() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express.json())
        this.app.use(cors())
    }

    public routes() {

        // public endpoints

        // chatbot
        // this.app.use('/api/commands/', this.controllers.commandController.router);
        // this.app.use('/api/timers/', this.controllers.timerController.router);
        this.app.use('/api/horaro/', this.controllers.horaroController.router);


        // marathon
        this.app.use('/api/tracker/bid/', this.controllers.bidController.router);
        this.app.use('/api/tracker/donation/', this.controllers.donationController.router);
        this.app.use('/api/tracker/event/', this.controllers.eventController.router);
        this.app.use('/api/tracker/prize/', this.controllers.prizeController.router);
        this.app.use('/api/tracker/run/', this.controllers.runController.router);
        this.app.use('/api/tracker/schedule/', this.controllers.scheduleController.router);
        this.app.use('/api/tracker/team/', this.controllers.teamController.router);
        this.app.use('/api/tracker/user/', this.controllers.userController.router);
        this.app.get("/", (req: Request, res: Response) => {
            res.send('Hello world!');
        })
    }

    public async start() {
        // await this.twitchAPI.init()
        https.createServer({
            cert: fs.readFileSync(process.env.CERT as string),
            key: fs.readFileSync(process.env.KEY as string)
        }, this.app).listen(process.env.S_PORT, function () {
            console.log(`Servidor https listening ${process.env.S_PORT}`);
        });
        const io = new Server(this.app.listen(this.app.get('port'), () => {
            console.log(`Server is listening ${this.app.get('port')} port.`);
        }),
            {
                cors: {
                    origin: "*",
                    // origin: ["http://localhost:8080", "http://localhost:9090"],
                    methods: ["GET", "POST", "PUT", "DELETE"],
                    credentials: true
                },
                allowEIO3: true
            }
        );

        io.on('connection', (socket) => {
            console.log('a user connected');
            io.emit('getCounter', this.horarioAPI.getCounter())
        });

        socketContext.set(io);

        // this.tmi.start()
    }

}

const server = new ServerBot();
server.start()