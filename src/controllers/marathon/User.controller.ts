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
        res.json(users);
    }

    public indexId = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const user = await this.userService.findById(id)
        console.log(user);
        res.json(user);
    }

    public create = async (req: Request, res: Response) => {
        const user = req['body'].user as User;
        const newUser = await this.userService.create(user);
        res.status(201).json(newUser)
        // res.send('si');
    }

    public update = async (req: Request, res: Response) => {
        const user = req['body'].user as User;
        const id = req['params']['id'];
        res.status(201).json(await this.userService.update(id, user));
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        res.status(200).json(await this.userService.delete(id));
    }

    public routes() {
        this.router.get('/', this.index);
        this.router.get('/:id', this.indexId);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}