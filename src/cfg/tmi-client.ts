import { Database } from 'sqlite3';
import tmi from 'tmi.js';
import { CommandService } from '../services/Command.service';
import { TimerService } from '../services/Timer.service';
import { horaroAPI } from './horaro-api';
import { twitchAPI } from './twitch-api';
// const commandHandler = require('../../services/cmd/command-handler.js')
// const { timerHandler, intervals } = require('../../services/timer/timer-handler.js')


export class TmiChat {
    private channelName: string = `${process.env.CHANNEL_NAME}`;
    private chatToken: string = `${process.env.CHAT_TOKEN}`
    public client: tmi.Client;
    private db: Database;
    public horaroAPI:horaroAPI;
    public twitchAPI:twitchAPI; 

    private commandService: CommandService;
    public timerService: TimerService;

    private opts: Object = {
        options: { debug: true },
        connection: {
            reconnect: true,
            secure: true
        },
        identity: {
            username: this.channelName,
            password: `oauth:${this.chatToken}`
        },
        channels: [
            this.channelName
        ]
    };


    constructor(db: Database, horaroAPI:horaroAPI, twitchAPI:twitchAPI) {
        this.db = db;
        this.commandService = new CommandService(this.db, this);
        this.timerService = new TimerService(this.db, this);
        this.client = new tmi.client(this.opts);
        this.horaroAPI = horaroAPI;
        this.twitchAPI = twitchAPI;


        this.client.on('connected', async (address, port) => {
            console.log(`Connected on ${address}:${port}`);
        })

        this.client.on('message', (channel, user, message, self) => {
            this.commandService.handleCommand(this.client, channel, user, message, self, this.horaroAPI, this.twitchAPI);

        })
        // this.start();
        // this.stop();
    }

    public getTimerService(){
        return this.timerService;
    }

    public getCommandService(){
        return this.commandService;
    }

    public async start() {
        try {
            await this.client.connect();
            this.timerService.initTimers();
        } catch (error) {
            return false;
        }
        return true;
    }

    public async stop() {
        await this.client.disconnect().then(async (data) => {
            // await timer.clearTimers()
            return true;
        }).catch((error) => {
            return false;
        })
    }

    public getChannelName(): string {
        return this.channelName;
    }

    public setChannelName(channelName: string): boolean {
        this.channelName = channelName;
        return true;
    }


}