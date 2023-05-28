import { Router, Response, Request } from 'express';
import { Database } from 'sqlite3';
import { TmiChat } from '../../cfg/tmi-client';
import { Timer } from '../../models/Timer';
import { CommandService } from '../../services/chatDb/Command.service';
import { TimerService } from '../../services/chatDb/Timer.service';

export class TimerController {
    public router: Router;
    private commandService: CommandService;
    private tmiChat: TmiChat;

    constructor(db: Database, tmiChat: TmiChat) {
        this.router = Router();
        this.commandService = new CommandService(db, tmiChat);
        this.tmiChat = tmiChat;
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        const timers = await this.tmiChat.getTimerService().index()
        res.send(timers).json();
    }

    public indexId = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const timer = await this.tmiChat.getTimerService().indexId(Number(id))
        res.send(timer);
    }

    public create = async (req: Request, res: Response) => {
        const timer = req['body'] as Timer;
        const newTimer = await this.tmiChat.getTimerService().create(timer);
        res.send(newTimer);
    }

    public update = async (req: Request, res: Response) => {
        const timer = req['body'] as Timer;
        const id = req['params']['id'];
        res.send(await this.tmiChat.getTimerService().update(Number(id), timer))
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        res.send(await this.tmiChat.getTimerService().delete(Number(id)))
    }

    public startInterval = (req: Request, res: Response) => {
        const id = req['params']['id'];
        if (this.tmiChat.getTimerService().startInterval(Number(id))) {
            res.send(true)
        } else {
            res.send(false)
        }
    }

    public stopInterval = (req: Request, res: Response) => {
        const id = req['params']['id'];
        if (this.tmiChat.getTimerService().stopInterval(Number(id))) {
            res.send(true)
        } else {
            res.send(false)
        }
    }

    public refreshInterval = (req: Request, res: Response) => {
        const id = req['params']['id'];
        if (this.tmiChat.getTimerService().refreshInterval(Number(id))) {
            res.send(true)
        } else {
            res.send(false)
        }
    }

    public routes() {
        this.router.post('/intervals/start/:id', this.startInterval);
        this.router.post('/intervals/stop/:id', this.stopInterval);
        this.router.post('/intervals/refresh/:id', this.refreshInterval);
        this.router.get('/all', this.index);
        this.router.get('/one/:id', this.indexId);
        this.router.post('/one/', this.create);
        this.router.put('/one/:id', this.update);
        this.router.delete('/one/:id', this.delete);
    }
}