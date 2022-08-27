import { Router, Request, Response } from "express";
import { ScheduleService } from "../../services/neDb/Schedule.service";
import Schedule from "../../types/Schedule";

export class ScheduleController {
    public router: Router;
    private scheduleService: ScheduleService;

    constructor(db: any) {
        this.router = Router();
        this.scheduleService = new ScheduleService(db);
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        const schedules = await this.scheduleService.find()
        res.send(schedules).json();
    }

    public indexId = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const schedule = await this.scheduleService.findById(id)
        console.log(schedule);
        res.send(schedule);
    }

    public create = async (req: Request, res: Response) => {
        const schedule = req['body'] as Schedule;
        const newSchedule = await this.scheduleService.create(schedule);
        res.send(newSchedule).status(201);
        // res.send('si');
    }

    public update = async (req: Request, res: Response) => {
        const schedule = req['body'] as Schedule;
        const id = req['params']['_id'];
        res.send(await this.scheduleService.update(id, schedule)).status(201);
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['_id'];
        res.send(await this.scheduleService.delete(id)).status(200);
    }

    public routes() {
        this.router.get('/', this.index);
        this.router.get('/:id', this.indexId);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}