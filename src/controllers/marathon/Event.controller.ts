import { Router, Request, Response } from "express";
import { EventService } from "../../services/neDb/Event.service";
import Event from "../../types/Event";

export class EventController {
    public router: Router;
    private eventService: EventService;

    constructor(db: any) {
        this.router = Router();
        this.eventService = new EventService(db);
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        const events = await this.eventService.find()
        res.send(events).json();
    }

    public indexId = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const event = await this.eventService.findById(id)
        console.log(event);
        res.send(event);
    }

    public create = async (req: Request, res: Response) => {
        const event = req['body'] as Event;
        const newEvent = await this.eventService.create(event);
        res.send(newEvent).status(201);
        // res.send('si');
    }

    public update = async (req: Request, res: Response) => {
        const event = req['body'] as Event;
        const id = req['params']['_id'];
        res.send(await this.eventService.update(id, event)).status(201);
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['_id'];
        res.send(await this.eventService.delete(id)).status(200);
    }

    public routes() {
        this.router.get('/', this.index);
        this.router.get('/:id', this.indexId);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}