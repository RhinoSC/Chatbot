import { Router, Request, Response } from "express";
import { TeamService } from "../../services/neDb/Team.service";
import Team from "../../types/Team";

export class TeamController {
    public router: Router;
    private teamService: TeamService;

    constructor(db: any) {
        this.router = Router();
        this.teamService = new TeamService(db);
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        const teams = await this.teamService.find()
        res.send(teams).json();
    }

    public indexId = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const team = await this.teamService.findById(id)
        console.log(team);
        res.send(team);
    }

    public create = async (req: Request, res: Response) => {
        const team = req['body'] as Team;
        const newTeam = await this.teamService.create(team);
        res.send(newTeam).status(201);
        // res.send('si');
    }

    public update = async (req: Request, res: Response) => {
        const team = req['body'] as Team;
        const id = req['params']['_id'];
        res.send(await this.teamService.update(id, team)).status(201);
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['_id'];
        res.send(await this.teamService.delete(id)).status(200);
    }

    public routes() {
        this.router.get('/', this.index);
        this.router.get('/:id', this.indexId);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}