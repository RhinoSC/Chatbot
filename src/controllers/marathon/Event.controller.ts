import { Router, Request, Response } from "express";
import { EventService } from "../../services/neDb/Event.service";
import Event from "../../types/Event";

export class EventController {
    public router: Router;
    private eventService: EventService;

    constructor(eventService: EventService) {
        this.router = Router();
        this.eventService = eventService;
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        const events = await this.eventService.find()
        res.json(events);
    }

    public indexId = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const event = await this.eventService.findById(id)
        console.log(event);
        res.json(event);
    }

    public indexName = async (req: Request, res: Response) => {
        const name = req['params']['name'];
        const event = await this.eventService.findByName(name)
        console.log(event);
        res.json(event);
    }

    public create = async (req: Request, res: Response) => {
        const event = req['body'].event as Event;
        const newEvent = await this.eventService.create(event);
        res.status(201).json(newEvent)
        // res.send('si');
    }

    public update = async (req: Request, res: Response) => {
        const event = req['body'].event as Event;
        const id = req['params']['id'];
        res.status(201).json(await this.eventService.update(id, event));
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        res.status(200).json(await this.eventService.delete(id));
    }

    public routes() {
        this.router.get('/', this.index);
        this.router.get('/:id', this.indexId);
        this.router.get('/name/:name', this.indexName);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}