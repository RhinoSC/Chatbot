import { Router, Request, Response } from "express";
import { DonationService } from "../../services/neDb/Donation.service";
import Donation from "../../types/Donation";

export class DonationController {
    public router: Router;
    private donationService: DonationService;

    constructor(db: any) {
        this.router = Router();
        this.donationService = new DonationService(db);
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        const donations = await this.donationService.find()
        res.send(donations).json();
    }

    public indexId = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const donation = await this.donationService.findById(id)
        console.log(donation);
        res.send(donation);
    }

    public create = async (req: Request, res: Response) => {
        const donation = req['body'] as Donation;
        const newDonation = await this.donationService.create(donation);
        res.send(newDonation).status(201);
        // res.send('si');
    }

    public update = async (req: Request, res: Response) => {
        const donation = req['body'] as Donation;
        const id = req['params']['_id'];
        res.send(await this.donationService.update(id, donation)).status(201);
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['_id'];
        res.send(await this.donationService.delete(id)).status(200);
    }

    public routes() {
        this.router.get('/', this.index);
        this.router.get('/:id', this.indexId);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}