import tmi from 'tmi.js';
import { Database } from "sqlite3";
import { Interval } from "../../models/Interval";
import { TimerRepository } from "../../repository/chatDb/Timer.repository";
import { Timer } from '../../models/Timer';
import { TmiChat } from '../../cfg/tmi-client';
import { Command } from '../../models/Command';

export class TimerService {
    private db: Database;
    private timerRepository: TimerRepository;
    private tmiChat: TmiChat;
    private timers: Timer[];
    private commands: Command[];
    private intervals: Interval[];

    constructor(db: Database, tmiChat: TmiChat) {
        this.db = db;
        this.tmiChat = tmiChat;
        this.timerRepository = new TimerRepository(this.db);
        this.timers = [];
        this.commands = [];
        this.intervals = [];

        this.init(this.tmiChat, this.timerRepository).then((value) => {
            if (value) {
                // console.log(this.intervals);
            }
        }).catch(err => {
            console.error(err);
        });
    }

    init = async (tmiChat: TmiChat, timerRepository: TimerRepository) => {

        this.setCommands(await tmiChat.getCommandService().getCommands());
        this.setTimers(await timerRepository.getTimers());
        let arr: Interval[] = [];
        this.timers.forEach(element => {
            let timer = new Timer(element.id, element.name, element.call, element.time, element.active, element.lastTime, element.description, element.message);
            let temp = new Interval(timer, this.tmiChat);
            arr.push(temp)
        });
        this.setIntervals(arr);
        return true;
    }

    public getCommands() {
        return this.commands;
    }

    public setCommands(commands: Command[]) {
        this.commands = commands;
    }

    public getTimers() {
        return this.timers;
    }

    public setTimers(timers: Timer[]) {
        this.timers = timers;
    }

    public getIntervals() {
        return this.intervals;
    }

    public setIntervals(intervals: Interval[]) {
        this.intervals = intervals;
    }

    public startInterval(id: number) {
        let temp = this.getIntervals()[id - 1];
        const command = this.commands.find(n => n.name === temp.call || n.alias.split(',').includes(temp.call));
        if (command) {
            if (!command.custom) {
                let customTimer = require(`../commands/${command.name}.js`)
                if (customTimer) {
                    return this.getIntervals()[id - 1].startTimer(command);
                }
            } else {
                this.getIntervals()[id - 1].setMessage(command.message)
            }
        }
        return this.getIntervals()[id - 1].startTimer(undefined);

    }

    public stopInterval(id: number) {
        return this.getIntervals()[id - 1].clearTimer();
    }

    public refreshInterval(id: number) {
        let temp = this.getIntervals()[id - 1];
        const command = this.commands.find(n => n.name === temp.call || n.alias.split(',').includes(temp.call));
        if (command) {
            if (!command.custom) {
                let customTimer = require(`../commands/${command.name}.js`)
                if (customTimer) {
                    return this.getIntervals()[id - 1].refreshTimer(command);
                }
            } else {
                this.getIntervals()[id - 1].setMessage(command.message)
            }
        }
        return this.getIntervals()[id - 1].refreshTimer(undefined);

    }

    public async initTimers() {
        this.intervals.forEach(async timer => {
            if (timer.call) {
                const command = this.commands.find(n => n.name === timer.call || n.alias.split(',').includes(timer.call));
                if (command) {
                    if (!command.custom) {
                        let customTimer = require(`../commands/${command.name}.js`)
                        if (customTimer) {
                            timer.startTimer(command)
                            // timer.clearTimer()
                            return;
                        }
                    } else {
                        timer.setMessage(command.message)
                    }
                }
            }
            timer.startTimer(undefined)

            // timer.clearTimer()
        })
    }

    public index = async (): Promise<Timer[]> => {
        const timers: Timer[] = await this.timerRepository.getTimers();
        return timers;
    }


    public indexId = async (id: number): Promise<Timer> => {
        const timer: Timer = await this.timerRepository.getTimerById(id);
        return timer;
    }

    public create = async (timer: Timer) => {
        const newTimer: any = await this.timerRepository.createTimer(timer)
        return newTimer;
    }

    public update = async (id: number, timer: Timer) => {
        const updateTimer: any = await this.timerRepository.updateTimer(id, timer);
        return updateTimer;
    }

    public delete = async (id: number) => {
        const deleteTimer: any = await this.timerRepository.deleteTimer(id)
        return deleteTimer;
    }
}