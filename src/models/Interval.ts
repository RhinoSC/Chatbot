import tmi from 'tmi.js';
import { TmiChat } from '../cfg/tmi-client';
import { Command } from './Command';
import { Timer } from "./Timer";

export class Interval extends Timer {
    public interval: NodeJS.Timer;
    private tmiChat: TmiChat;
    constructor(timer: Timer, tmiChat: TmiChat) {
        super(timer.id, timer.name, timer.call, timer.time, timer.active, timer.lastTime, timer.description, timer.message);
        this.tmiChat = tmiChat;
        this.interval = setInterval(() => {
            console.log('funcion');
        }, 100000000);
    }


    public getInterval = () => {
        return this.interval;
    }

    public setMyInterval = (interval: NodeJS.Timer) => {
        this.interval = interval
    }

    startTimer(command: Command | undefined) {
        if (this.active) {
            if (command) {
                this.setMyInterval(setInterval(async () => {
                    this.tmiChat.getCommandService().executeCommand(command, [], this.tmiChat.client, this.tmiChat.getChannelName(), undefined, this.tmiChat.horaroAPI, this.tmiChat.twitchAPI, true);
                }, this.time))
            } else {
                this.setMyInterval(setInterval(async () => {
                    this.tmiChat.client.say(this.tmiChat.getChannelName(), this.message);
                }, this.time))
            }
            console.log('he creado el timer', this.name);

            return true;
        }
        return false;
    }


    clearTimer() {
        if (this.interval) {
            clearInterval(this.getInterval());
            console.log('Se elimino timer', this.name);
            return true;
        }
        return false;
    }

    refreshTimer(command: Command | undefined) {
        if (this.interval) {
            console.log('refresque el timer', this.name);
            this.clearTimer()
            this.startTimer(command)
            return true;
        }
        return false;
    }
}