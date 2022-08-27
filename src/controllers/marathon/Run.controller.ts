import { Router, Request, Response } from "express";
import { RunService } from "../../services/neDb/Run.service";
import Run from "../../types/Run";

export class RunController {
    public router: Router;
    private runService: RunService;

    constructor(db: any) {
        this.router = Router();
        this.runService = new RunService(db);
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        const runs = await this.runService.find()
        res.send(runs).json();
    }

    public indexId = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const run = await this.runService.findById(id)
        console.log(run);
        res.send(run);
    }

    public create = async (req: Request, res: Response) => {
        const run = req['body'] as Run;
        const newRun = await this.runService.create(run);
        res.send(newRun).status(201);
        // res.send('si');
    }

    public update = async (req: Request, res: Response) => {
        const run = req['body'] as Run;
        const id = req['params']['_id'];
        res.send(await this.runService.update(id, run)).status(201);
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['_id'];
        res.send(await this.runService.delete(id)).status(200);
    }

    public routes() {
        this.router.get('/', this.index);
        this.router.get('/:id', this.indexId);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}