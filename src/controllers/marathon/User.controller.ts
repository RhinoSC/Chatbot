import { Router, Request, Response } from "express";
import { UserService } from "../../services/neDb/User.service";
import User from "../../types/User";

export class UserController {
    public router: Router;
    private userService: UserService;

    constructor(db: any) {
        this.router = Router();
        this.userService = new UserService(db);
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        const users = await this.userService.find()
        res.send(users).json();
    }

    public indexId = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const user = await this.userService.findById(id)
        console.log(user);
        res.send(user);
    }

    public create = async (req: Request, res: Response) => {
        const user = req['body'] as User;
        const newUser = await this.userService.create(user);
        res.send(newUser).status(201);
        // res.send('si');
    }

    public update = async (req: Request, res: Response) => {
        const user = req['body'] as User;
        const id = req['params']['id'];
        res.send(await this.userService.update(id, user)).status(201);
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        res.send(await this.userService.delete(id)).status(200);
    }

    public routes() {
        this.router.get('/', this.index);
        this.router.get('/:id', this.indexId);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}