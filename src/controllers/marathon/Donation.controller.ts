import { Router, Request, Response } from "express";
import { neDB } from "../../cfg/db/neDb/nedb";
import { DonationService } from "../../services/neDb/Donation.service";
import Donation from "../../types/Donation";

export class DonationController {
    public router: Router;
    private donationService: DonationService;

    constructor(neDB: neDB) {
        this.router = Router();
        this.donationService = new DonationService(neDB);
        this.routes();
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
        res.status(201).json(newDonation)
        // res.send('si');
    }

    public update = async (req: Request, res: Response) => {
        const donation = req['body'].donation as Donation;
        const id = req['params']['id'];
        res.status(201).json(await this.donationService.update(id, donation));
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        res.status(200).json(await this.donationService.delete(id));
    }

    public routes() {
        this.router.get('/', this.index);
        this.router.get('/:id', this.indexId);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}