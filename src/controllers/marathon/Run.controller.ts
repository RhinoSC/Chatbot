import { Router, Request, Response } from "express";
import { neDB } from "../../cfg/db/neDb/nedb.interface";
import { RunService } from "../../services/neDb/Run.service";
import Run from "../../types/Run";

export class RunController {
    public router: Router;
    private runService: RunService;

    constructor(runService: RunService) {
        this.router = Router();
        this.runService = runService;
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        const runs = await this.runService.find()
        res.json(runs);
    }

    public indexId = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const run = await this.runService.findById(id)
        console.log(run);
        res.json(run);
    }

    public create = async (req: Request, res: Response) => {
        const run = req['body'].run as Run;
        const newRun = await this.runService.create(run);
        res.status(201).json(newRun)
    }

    public createWithInternalFieldsEmpty = async (req: Request, res: Response) => {
        const run = req['body'].run as Run;
        const newRun = await this.runService.createWithInternalFieldsEmpty(run);
        res.status(201).json(newRun)
    }

    public update = async (req: Request, res: Response) => {
        const run = req['body'].run as Run;
        const id = req['params']['id'];
        res.status(201).json(await this.runService.update(id, run));
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        res.status(200).json(await this.runService.delete(id));
    }

    public routes() {
        this.router.get('/', this.index);
        this.router.get('/:id', this.indexId);
        this.router.post('/', this.create);
        this.router.post('/advanced', this.createWithInternalFieldsEmpty);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}