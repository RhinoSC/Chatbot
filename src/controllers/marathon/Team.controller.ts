import { Router, Request, Response } from "express";
import { neDB } from "../../cfg/db/neDb/nedb";
import { TeamService } from "../../services/neDb/Team.service";
import Team from "../../types/Team";

export class TeamController {
    public router: Router;
    private teamService: TeamService;

    constructor(neDB: neDB) {
        this.router = Router();
        this.teamService = new TeamService(neDB.db.team);
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
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}