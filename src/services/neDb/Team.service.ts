import { neDB } from "../../cfg/db/neDb/nedb";
import { TeamRepository } from "../../repository/neDb/Team.repository";
import Team from "../../types/Team";

export class TeamService {
    private db: any;
    private TeamRepository: TeamRepository;

    constructor(neDB: neDB) {
        this.db = neDB.db.team;
        this.TeamRepository = new TeamRepository(this.db);
    }

    public find = async (): Promise<Team[]> => {
        const teams: Team[] = await this.TeamRepository.findTeams();
        return teams;
    }

    public findById = async (id: string): Promise<Team[]> => {
        const team: Team[] = await this.TeamRepository.findTeamById(id);
        return team;
    }

    public findByName = async (name: string): Promise<Team[]> => {
        const team: Team[] = await this.TeamRepository.findTeamByName(name);
        return team;
    }

    public create = async (team: Team) => {
        const newTeam: Team = await this.TeamRepository.addNewTeam(team)
        return newTeam;
    }

    public update = async (id: string, team: Team) => {
        const updateTeam: Team = await this.TeamRepository.updateTeam(id, team)
        return updateTeam;
    }

    public delete = async (id: string) => {
        const deleteTeam: any = await this.TeamRepository.deleteTeam(id)
        return deleteTeam;
    }
}