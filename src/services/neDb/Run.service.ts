import { neDBObject } from "../../cfg/db/neDb/nedb";
import { RunRepository } from "../../repository/neDb/Run.repository";
import Run from "../../types/Run";
import { BidService } from "./Bid.service";
import { ScheduleService } from "./Schedule.service";
import { TeamService } from "./Team.service";

export class RunService {
    private db: any;
    private RunRepository: RunRepository;
    private BidService: BidService;
    private ScheduleService: ScheduleService;
    private TeamService: TeamService

    constructor(db: any) {
        this.db = db;
        this.RunRepository = new RunRepository(this.db);
        this.BidService = neDBObject.services.bidService
        this.ScheduleService = neDBObject.services.scheduleService
        this.TeamService = neDBObject.services.teamService
    }

    public find = async (): Promise<Run[]> => {
        const runs: Run[] = await this.RunRepository.findRuns();
        return runs;
    }

    public findById = async (id: string): Promise<Run[]> => {
        const run: Run[] = await this.RunRepository.findRunById(id);
        return run;
    }

    public findByName = async (name: string): Promise<Run[]> => {
        const run: Run[] = await this.RunRepository.findRunByName(name);
        return run;
    }

    public create = async (run: Run) => {
        const newRun: Run = await this.RunRepository.addNewRun(run)
        return newRun;
    }

    public createWithInternalFieldsEmpty = async (run: Run) => {

        const schedule = await this.ScheduleService.findById(run.scheduleId)

        for (let i = 0; i < run.teams.length; i++) {
            const team = run.teams[i];

            const savedTeam = await this.TeamService.create(team)
            run.teams[i] = savedTeam

        }

        for (let i = 0; i < run.bids.length; i++) {
            const bid = run.bids[i]
            const savedBid = await this.BidService.create(bid)
            run.bids[i] = savedBid
        }

        const newRun: Run = await this.RunRepository.addNewRun(run)

        schedule[0].rows.push(newRun)
        await this.ScheduleService.update(newRun.scheduleId, schedule[0])

        return newRun;
    }

    public update = async (id: string, run: Run) => {
        const updateRun: Run = await this.RunRepository.updateRun(id, run)
        return updateRun;
    }

    public delete = async (id: string) => {
        const deleteRun: any = await this.RunRepository.deleteRun(id)
        return deleteRun;
    }
}