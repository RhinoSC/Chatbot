import { Router, Request, Response } from "express";
import { checkJwt } from "../../middleware/authz.middleware";
import { checkPermissions } from "../../middleware/permissions.middleware";
import { TeamService } from "../../services/neDb/Team.service";
import Services from "../../types/Services";
import Team from "../../types/Team";
import { permissions } from "../../utils/enums/role.enum";

export class TeamController {
    public router: Router;
    private teamService: TeamService;

    constructor(teamService: TeamService, services: Services) {
        this.router = Router();
        this.teamService = teamService;
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        const teams = await this.teamService.find()
        res.json(teams);
    }

    public indexId = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const team = await this.teamService.findById(id)
        console.log(team);
        res.json(team);
    }

    public create = async (req: Request, res: Response) => {
        const team = req['body'].team as Team;
        const newTeam = await this.teamService.create(team);
        res.status(201).json(newTeam)
        // res.send('si');
    }

    public update = async (req: Request, res: Response) => {
        const team = req['body'].team as Team;
        const id = req['params']['id'];
        res.status(201).json(await this.teamService.update(id, team));
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        res.status(200).json(await this.teamService.delete(id));
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