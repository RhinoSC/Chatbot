import { Router, Request, Response } from "express";
import { EventService } from "../../services/neDb/Event.service";
import { PrizeService } from "../../services/neDb/Prize.service";
import Prize from "../../types/Prize";
import Services from "../../types/Services";

export class PrizeController {
    public router: Router;
    private prizeService: PrizeService;
    private eventService: EventService;

    constructor(prizeService: PrizeService, services: Services) {
        this.router = Router();
        this.prizeService = prizeService;
        this.eventService = services.eventService
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        const prizes = await this.prizeService.find()
        res.json(prizes);
    }

    public indexId = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const prize = await this.prizeService.findById(id)
        console.log(prize);
        res.json(prize);
    }

    public create = async (req: Request, res: Response) => {
        const prize = req['body'].prize as Prize;

        const newPrize = await this.prizeService.create(prize);

        const event = await this.eventService.findById(prize.eventId)
        event[0].prizes.push(newPrize)

        await this.eventService.update(event[0]._id, event[0])

        res.status(201).json(newPrize)
    }

    public update = async (req: Request, res: Response) => {
        const prize = req['body'].prize as Prize;
        const id = req['params']['id'];

        const updatedPrize = await this.prizeService.update(id, prize)

        const event = await this.eventService.findById(updatedPrize.eventId)

        for (let i = 0; i < event[0].prizes.length; i++) {
            const oldPrize = event[0].prizes[i]
            if (oldPrize._id == id) {
                event[0].prizes[i] = updatedPrize
                break
            }
        }

        await this.eventService.update(event[0]._id, event[0])

        res.status(201).json(updatedPrize);
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['id'];

        const oldPrize = await this.prizeService.findById(id)

        const event = await this.eventService.findById(oldPrize[0].eventId)

        const prizeIndex = event[0].prizes.findIndex(prize => prize._id == oldPrize[0]._id)
        if (prizeIndex != 1)
            event[0].prizes.splice(prizeIndex, 1)

        await this.eventService.update(event[0]._id, event[0])

        const numDeleted = await this.prizeService.delete(id)

        res.status(200).json({ deletedPrize: oldPrize, num: numDeleted });
    }

    public routes() {
        this.router.get('/', this.index);
        this.router.get('/:id', this.indexId);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}