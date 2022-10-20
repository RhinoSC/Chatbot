import { Router, Request, Response } from "express";
import { checkJwt } from "../../middleware/authz.middleware";
import { checkPermissions } from "../../middleware/permissions.middleware";
import { UserService } from "../../services/neDb/User.service";
import Services from "../../types/Services";
import User from "../../types/User";
import { permissions } from "../../utils/enums/role.enum";

export class UserController {
    public router: Router;
    private userService: UserService;

    constructor(userService: UserService, services: Services) {
        this.router = Router();
        this.userService = userService;
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
        this.router.get('/all', this.index);
        this.router.get('/one/:id', this.indexId);
        this.router.use(checkJwt);
        this.router.use(checkPermissions([permissions["create:all"], permissions["read:all"], permissions["update:all"]]))
        this.router.post('/one', this.create);
        this.router.put('/one/:id', this.update);
        this.router.delete('/one/:id', this.delete);
    }
}