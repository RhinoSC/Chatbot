import { Router, Request, Response } from "express";
import { checkJwt } from "../../middleware/authz.middleware";
import { checkPermissions } from "../../middleware/permissions.middleware";
import { EventService } from "../../services/neDb/Event.service";
import { ScheduleService } from "../../services/neDb/Schedule.service";
import Schedule from "../../types/Schedule";
import Services from "../../types/Services";
import { permissions } from "../../utils/enums/role.enum";

export class ScheduleController {
    public router: Router;
    private scheduleService: ScheduleService;
    private eventService: EventService

    constructor(scheduleService: ScheduleService, services: Services) {
        this.router = Router();
        this.scheduleService = scheduleService;
        this.eventService = services.eventService
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

        if (newSchedule.eventId) {
            const event = await this.eventService.findById(newSchedule.eventId)
            event[0].schedule = newSchedule
            this.eventService.update(event[0]._id, event[0])
        }

        res.status(201).json(newSchedule)
        // res.send('si');
    }

    public update = async (req: Request, res: Response) => {
        const schedule = req['body'].schedule as Schedule;
        const id = req['params']['id'];

        const updateSchedule: Schedule = await this.scheduleService.update(id, schedule)

        if (updateSchedule.eventId) {
            const event = await this.eventService.findById(updateSchedule.eventId)
            event[0].schedule = updateSchedule
            this.eventService.update(event[0]._id, event[0])
        }

        res.status(201).json(updateSchedule);
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['id'];

        const schedule: Schedule[] = await this.scheduleService.findById(id)

        const event = await this.eventService.findById(schedule[0].eventId)
        if (event[0]) {
            event[0].schedule = undefined
            await this.eventService.update(event[0]._id, event[0])
        }

        const numDeleted = await this.scheduleService.delete(id)
        res.status(200).json({ deletedSchedule: schedule, num: numDeleted });
    }

    public routes() {
        this.router.get('/all', this.index);
        this.router.get('/one/:id', this.indexId);
        this.router.use(checkJwt);
        this.router.use(checkPermissions([permissions["create:all"], permissions["read:all"], permissions["update:all"]]))
        this.router.post('/one', this.create);
        this.router.put('/one/:id', this.update);
        this.router.delete('/one/:id', this.delete);
    }
}