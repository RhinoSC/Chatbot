import { Router, Request, Response } from "express";
import { BidService } from "../../services/neDb/Bid.service";
import Bid from "../../types/Bid";

export class BidController {
    public router: Router;
    private bidService: BidService;

    constructor(bidService: BidService) {
        this.router = Router();
        this.bidService = bidService;
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        const bids = await this.bidService.find()
        res.json(bids);
    }

    public indexId = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const bid = await this.bidService.findById(id)
        console.log(bid);
        res.json(bid);
    }

    public create = async (req: Request, res: Response) => {
        const bid = req['body'].bid as Bid;
        const newBid = await this.bidService.create(bid);
        res.status(201).json(newBid)
        // res.send('si');
    }

    public update = async (req: Request, res: Response) => {
        const bid = req['body'].bid as Bid;
        const id = req['params']['id'];
        res.status(201).json(await this.bidService.update(id, bid));
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        res.status(200).json(await this.bidService.delete(id));
    }

    public routes() {
        this.router.get('/', this.index);
        this.router.get('/:id', this.indexId);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}