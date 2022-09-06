import { Router, Request, Response } from "express";
import { neDB } from "../../cfg/db/neDb/nedb";
import { ScheduleService } from "../../services/neDb/Schedule.service";
import Schedule from "../../types/Schedule";

export class ScheduleController {
    public router: Router;
    private scheduleService: ScheduleService;

    constructor(neDB: neDB) {
        this.router = Router();
        this.scheduleService = new ScheduleService(neDB);
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        const schedules = await this.scheduleService.find()
        res.json(schedules);
    }

    public indexId = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const schedule = await this.scheduleService.findById(id)
        console.log(schedule);
        res.json(schedule);
    }

    public create = async (req: Request, res: Response) => {
        const schedule = req['body'].schedule as Schedule;
        const newSchedule = await this.scheduleService.create(schedule);
        res.status(201).json(newSchedule)
        // res.send('si');
    }

    public update = async (req: Request, res: Response) => {
        const schedule = req['body'].schedule as Schedule;
        const id = req['params']['id'];
        res.status(201).json(await this.scheduleService.update(id, schedule));
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        res.status(200).json(await this.scheduleService.delete(id));
    }

    public routes() {
        this.router.get('/', this.index);
        this.router.get('/:id', this.indexId);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}