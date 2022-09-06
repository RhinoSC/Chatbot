import { Router, Request, Response } from "express";
import { neDB } from "../../cfg/db/neDb/nedb";
import { PrizeService } from "../../services/neDb/Prize.service";
import Prize from "../../types/Prize";

export class PrizeController {
    public router: Router;
    private prizeService: PrizeService;

    constructor(neDB: neDB) {
        this.router = Router();
        this.prizeService = new PrizeService(neDB);
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
        res.status(201).json(newPrize)
        // res.send('si');
    }

    public update = async (req: Request, res: Response) => {
        const prize = req['body'].prize as Prize;
        const id = req['params']['id'];
        res.status(201).json(await this.prizeService.update(id, prize));
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        res.status(200).json(await this.prizeService.delete(id));
    }

    public routes() {
        this.router.get('/', this.index);
        this.router.get('/:id', this.indexId);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}