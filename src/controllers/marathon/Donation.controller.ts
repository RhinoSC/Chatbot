import { Router, Request, Response } from "express";
import { checkJwt } from "../../middleware/authz.middleware";
import { checkPermissions } from "../../middleware/permissions.middleware";
import { DonationService } from "../../services/neDb/Donation.service";
import { EventService } from "../../services/neDb/Event.service";
import Donation from "../../types/Donation";
import Services from "../../types/Services";
import { permissions } from "../../utils/enums/role.enum";

export class DonationController {
    public router: Router;
    private donationService: DonationService;
    private eventService: EventService;

    constructor(donationService: DonationService, services: Services) {
        this.router = Router();
        this.donationService = donationService;
        this.eventService = services.eventService
        this.routes();
    }

    public hola = async (req: Request, res: Response) => {
        console.log('funcione')
        res.json('donations');
    }
    public index = async (req: Request, res: Response) => {
        const donations = await this.donationService.find()
        res.json(donations);
    }

    public indexId = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const donation = await this.donationService.findById(id)
        console.log(donation);
        res.json(donation);
    }

    public create = async (req: Request, res: Response) => {
        const donation = req['body'].donation as Donation;
        const newDonation = await this.donationService.create(donation);

        if (newDonation._id) {
            const event = await this.eventService.findById(newDonation.eventId)
            event[0].isCharityData.totalDonated += newDonation.amount
            event[0].donations.push(newDonation)
            this.eventService.update(event[0]._id, event[0])
        }

        res.status(201).json(newDonation)
    }

    public update = async (req: Request, res: Response) => {
        const donation = req['body'].donation as Donation;
        const id = req['params']['id'];

        const updatedDonation = await this.donationService.update(id, donation)

        if (updatedDonation._id) {
            const event = await this.eventService.findById(updatedDonation.eventId)
            event[0].isCharityData.totalDonated += updatedDonation.amount
            const idx = event[0].donations.findIndex(don => don._id === updatedDonation._id)
            if (idx !== -1) {
                event[0].donations[idx] = updatedDonation
            } else {
                event[0].donations.push(updatedDonation)
            }
            this.eventService.update(event[0]._id, event[0])
        }

        res.status(201).json(updatedDonation);
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['id'];

        const donation: Donation[] = await this.donationService.findById(id);

        if (donation[0]._id) {
            const event = await this.eventService.findById(donation[0].eventId)
            event[0].isCharityData.totalDonated -= donation[0].amount
            const idx = event[0].donations.findIndex(don => don._id === donation[0]._id)
            if (idx !== -1) {
                event[0].donations.splice(idx, 1)
                this.eventService.update(event[0]._id, event[0])
            }
        }

        const numDeleted = await this.donationService.delete(id)

        res.status(200).json({ deletedDonation: donation, num: numDeleted });
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