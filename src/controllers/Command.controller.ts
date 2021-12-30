import { Router, Response, Request } from 'express';
import { Database } from 'sqlite3';
import { TmiChat } from '../cfg/tmi-client';
import { Command } from '../models/Command';
import { CommandService } from '../services/Command.service';

export class CommandController {
    public router: Router;
    private commandService: CommandService;

    constructor(db: Database, tmiChat:TmiChat) {
        this.router = Router();
        this.commandService = new CommandService(db, tmiChat);
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        const commands = await this.commandService.index()
        res.send(commands).json();
    }

    public indexId = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const command = await this.commandService.indexId(Number(id))
        console.log(command);
        res.send(command);
    }

    public create = async (req: Request, res: Response) => {
        const command = req['body'] as Command;
        const newCommand = await this.commandService.create(command);
        res.send(newCommand).status(201);
        // res.send('si');
    }

    public update = async (req: Request, res: Response) => {
        const command = req['body'] as Command;
        const id = req['params']['id'];
        res.send(await this.commandService.update(Number(id), command)).status(201);
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        res.send(await this.commandService.delete(Number(id))).status(200);
    }

    public routes() {
        this.router.get('/', this.index);
        this.router.get('/:id', this.indexId);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}