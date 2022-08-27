import { Router, Request, Response } from "express";
import { BidService } from "../../services/neDb/Bid.service";
import Bid from "../../types/Bid";

export class BidController {
    public router: Router;
    private bidService: BidService;

    constructor(db: any) {
        this.router = Router();
        this.bidService = new BidService(db);
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        const bids = await this.bidService.find()
        res.send(bids).json();
    }

    public indexId = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const bid = await this.bidService.findById(id)
        console.log(bid);
        res.send(bid);
    }

    public create = async (req: Request, res: Response) => {
        const bid = req['body'] as Bid;
        const newBid = await this.bidService.create(bid);
        res.send(newBid).status(201);
        // res.send('si');
    }

    public update = async (req: Request, res: Response) => {
        const bid = req['body'] as Bid;
        const id = req['params']['_id'];
        res.send(await this.bidService.update(id, bid)).status(201);
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['_id'];
        res.send(await this.bidService.delete(id)).status(200);
    }

    public routes() {
        this.router.get('/', this.index);
        this.router.get('/:id', this.indexId);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}