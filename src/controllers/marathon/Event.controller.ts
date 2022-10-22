import { Router, Request, Response } from "express";
import nodecg from "../../cfg/nodecg";
import { checkJwt } from "../../middleware/authz.middleware";
import { checkPermissions } from "../../middleware/permissions.middleware";
import { DonationService } from "../../services/neDb/Donation.service";
import { EventService } from "../../services/neDb/Event.service";
import Event from "../../types/Event";
import Services from "../../types/Services";
import { permissions } from "../../utils/enums/role.enum";

export class EventController {
    public router: Router;
    private eventService: EventService;
    private donationService: DonationService;

    constructor(eventService: EventService, services: Services) {
        this.router = Router();
        this.eventService = eventService;
        this.donationService = services.donationService;
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

    public getTotalDonationMount = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const event = await this.eventService.findById(id)
        const donations = await this.donationService.find()
        let amount = 0.0
        donations.forEach(donation => {
            if (donation.eventId === id)
                amount += Number(donation.amount)
        })
        // console.log(amount)
        res.status(201).json({ totalAmount: amount, amount: event[0].isCharityData.totalDonated })
    }

    public indexName = async (req: Request, res: Response) => {
        const name = req['params']['name'];
        const event = await this.eventService.findByName(name)
        console.log(event);
        // try {
        //     await nodecg.axios.post('/sre9/update-event', { event: event[0] })
        // } catch (error) {
        //     console.error(error, 'Error sendind to nodecg the event')
        // }
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

        const updatedEvent = await this.eventService.update(id, event)
        try {
            await nodecg.axios.post('/sre9/update-event', { event: updatedEvent })
        } catch (error) {
            console.error(error, 'Error sendind to nodecg the event')
        }
        res.status(201).json(updatedEvent);
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        res.status(200).json(await this.eventService.delete(id));
    }

    public routes() {
        this.router.get('/all', this.index);
        this.router.get('/name/:name', this.indexName);
        this.router.get('/one/:id', this.indexId);
        this.router.get('/one/:id/total-donated', this.getTotalDonationMount);
        this.router.use(checkJwt);
        this.router.use(checkPermissions([permissions["create:all"], permissions["read:all"], permissions["update:all"]]))
        this.router.post('/one', this.create);
        this.router.put('/one/:id', this.update);
        this.router.delete('/one/:id', this.delete);
    }
}