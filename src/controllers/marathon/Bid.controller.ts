import { Router, Request, Response } from "express";
import { checkJwt } from "../../middleware/authz.middleware";
import { checkPermissions } from "../../middleware/permissions.middleware";
import { BidService } from "../../services/neDb/Bid.service";
import { RunService } from "../../services/neDb/Run.service";
import Bid from "../../types/Bid";
import Services from "../../types/Services";
import { permissions } from "../../utils/enums/role.enum";

export class BidController {
    public router: Router;
    private bidService: BidService;

    // private runService: RunService

    constructor(bidService: BidService, services: Services) {
        this.router = Router();
        this.bidService = bidService;
        // this.runService = services.runService
        this.routes();

        // console.log(this.runService)
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
        this.router.use(checkJwt);
        this.router.use(checkPermissions([permissions["create:all"], permissions["read:all"], permissions["update:all"]]))
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}