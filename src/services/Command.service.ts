import { Database } from "sqlite3";
import tmi from 'tmi.js';
import { horaroAPI } from "../cfg/horaro-api";
import { TmiChat } from "../cfg/tmi-client";
import { twitchAPI } from "../cfg/twitch-api";
import { Command } from "../models/Command";
import { Interval } from "../models/Interval";
import { CommandRepository } from "../repository/Command.repository";

export class CommandService {
    private db: Database;
    private tmiChat: TmiChat;
    private CommandRepository: CommandRepository;
    public prefix: string = `${process.env.CMD_PREFIX}`;

    constructor(db: Database, tmiChat: TmiChat) {
        this.db = db;
        this.tmiChat = tmiChat;
        this.CommandRepository = new CommandRepository(this.db);
    }

    public async getCommands(): Promise<Command[]> {
        return await this.CommandRepository.getCommands();
    }

    public async executeCommand(command: Command, args: any[] = [], client:tmi.Client, channel:string, user:tmi.ChatUserstate | undefined, horaroAPI: horaroAPI, twitchAPI: twitchAPI, isInterval:boolean = false) {
        let text;
        try {
            let intervals = this.tmiChat.getTimerService().getIntervals();
            let interval = intervals.find((element: Interval) => {
                return element.call == command.name || command.alias.split(',').includes(element.call);
            })
            if (!command.custom) {
                let customRun = require(`../commands/${command.name}.js`)
                if (customRun) {
                    text = await customRun(args, horaroAPI, twitchAPI);
                    if (interval && !isInterval) {
                        interval.refreshTimer(command)
                    }
                } else {
                    throw new Error(`can't find command ${command.name}.js`)
                }
            }
            if (interval && !isInterval) {
                interval.refreshTimer(command)
            }
            command.lastTime = new Date().toISOString();
            await this.CommandRepository.updateCommand(command.id, command);
            if (text) {
                if(!isInterval){
                    client.say(channel, `@${user!.username}: ${command.message} ${text}`)
                }else {
                    client.say(channel, `${command.message} ${text}`)
                }
            } else {
                if(!isInterval){
                    client.say(channel, `@${user!.username}: ${command.message}`)
                }else{
                    client.say(channel, `${command.message}`)
                }
            }
        } catch (err) {
            console.error(err)
        }
    }

    public async handleCommand(client: tmi.Client, channel: string, user: tmi.ChatUserstate, message: string, self: boolean, horaroAPI: horaroAPI, twitchAPI: twitchAPI) {
        if (self || !message.startsWith(this.prefix)) return;

        let isBroadcaster: string;
        let isMod: string;
        let isSub: string;
        let modUp: string;

        if (user['badges']) {
            isBroadcaster = user['badges'].broadcaster!;
            isMod = user['badges'].moderator!;
            isSub = user.badges.subscriber! || user.badges.founder!;
            modUp = isMod || isBroadcaster;
        } else {
            isBroadcaster = '0';
            isMod = '0';
            isSub = '0';
            modUp = '0';
        }
        let permissions: { [key: string]: string }
        permissions = {
            broadUp: isBroadcaster || modUp,
            modUp: isMod || isBroadcaster,
            subUp: isSub || modUp,
            else: 'else'
        }

        const commands = await this.CommandRepository.getCommands();

        const args = message.slice(1).split(/\ +/g);
        const commandName = args.shift()!.toLowerCase();
        const command = commands.find(n => n.name === commandName || n.alias.split(',').includes(commandName));

        if (!command) { console.log('no se encontro comando'); return; }
        if (!permissions[command.permissionLvl]) return;
        if (!command.active) return;
        if (Date.now() - (new Date(command.lastTime).getTime() + command.cooldown) <= 0) return;

        this.executeCommand(command, args, client, channel, user, horaroAPI, twitchAPI);
    };

    public index = async (): Promise<Command[]> => {
        const commands: Command[] = await this.getCommands();
        return commands;
    }

    public indexId = async (id: number): Promise<Command> => {
        const command: Command = await this.CommandRepository.getCommandById(id);
        return command;
    }

    public create = async (command: Command) => {
        const newCommand: any = await this.CommandRepository.createCommand(command)
        return newCommand;
    }

    public update = async (id: number, command: Command) => {
        const updateCommand: any = await this.CommandRepository.updateCommand(id, command);
        return updateCommand;
    }

    public delete = async (id: number) => {
        const deleteCommand: any = await this.CommandRepository.deleteCommand(id)
        return deleteCommand;
    }

}
