import { Router, Request, Response } from "express";
import { PrizeService } from "../../services/neDb/Prize.service";
import Prize from "../../types/Prize";

export class PrizeController {
    public router: Router;
    private prizeService: PrizeService;

    constructor(db: any) {
        this.router = Router();
        this.prizeService = new PrizeService(db);
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        const prizes = await this.prizeService.find()
        res.send(prizes).json();
    }

    public indexId = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const prize = await this.prizeService.findById(id)
        console.log(prize);
        res.send(prize);
    }

    public create = async (req: Request, res: Response) => {
        const prize = req['body'] as Prize;
        const newPrize = await this.prizeService.create(prize);
        res.send(newPrize).status(201);
        // res.send('si');
    }

    public update = async (req: Request, res: Response) => {
        const prize = req['body'] as Prize;
        const id = req['params']['_id'];
        res.send(await this.prizeService.update(id, prize)).status(201);
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['_id'];
        res.send(await this.prizeService.delete(id)).status(200);
    }

    public routes() {
        this.router.get('/', this.index);
        this.router.get('/:id', this.indexId);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}