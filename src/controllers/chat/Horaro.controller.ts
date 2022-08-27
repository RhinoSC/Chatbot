import { Router, Response, Request } from 'express';
import { horaroAPI } from '../../cfg/horaro-api';

export class HoraroController {
    public router: Router;
    public horaroAPI: horaroAPI;

    constructor() {
        this.router = Router();
        this.horaroAPI = new horaroAPI();
        this.routes()


    }

    public index = async (req: Request, res: Response) => {
        let items = await this.horaroAPI.getRows();
        let columns = await this.horaroAPI.getColumns();

        res.send({ items: items, columns: columns })
    }

    public routes() {
        this.router.get('/', this.index);
    }
}