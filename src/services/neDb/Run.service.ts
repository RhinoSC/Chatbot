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

        schedule[0].availableRuns.push(newRun)
        await this.ScheduleService.update(newRun.scheduleId, schedule[0])

        return newRun;
    }

    public update = async (id: string, run: Run) => {
        const oldRun: Run[] = await this.RunRepository.findRunById(id)

        const schedule = await this.ScheduleService.findById(run.scheduleId)

        oldRun[0].teams.forEach(async (oldTeam) => {
            const oldTeamIndex = run.teams.findIndex(team => team._id == oldTeam._id)
            if (oldTeamIndex == -1) {
                await this.TeamService.delete(oldTeam._id)
            }
        });

        for (let i = 0; i < run.teams.length; i++) {
            const newTeam = run.teams[i];
            const oldTeamIndex = oldRun[0].teams.findIndex(team => team._id == newTeam._id)
            if (oldTeamIndex != -1) {
                const updatedTeam = await this.TeamService.update(newTeam._id, newTeam)
                run.teams[i] = updatedTeam
            } else {
                const createdTeam = await this.TeamService.create(newTeam)
                run.teams[i] = createdTeam
            }
        }


        oldRun[0].bids.forEach(async (oldBid) => {
            const oldBidIndex = run.bids.findIndex(bid => bid._id == oldBid._id)
            if (oldBidIndex == -1)
                await this.BidService.delete(oldBid._id)
        });

        for (let i = 0; i < run.bids.length; i++) {
            const newBid = run.bids[i]
            const oldBidIndex = oldRun[0].bids.findIndex(bid => bid._id == newBid._id)
            if (oldBidIndex != -1) {
                const updatedBid = await this.BidService.update(newBid._id, newBid)
                run.bids[i] = updatedBid
            } else {
                const createdBid = await this.BidService.create(newBid)
                run.bids[i] = createdBid
            }
        }

        for (let i = 0; i < schedule[0].rows.length; i++) {
            const oldRow = schedule[0].rows[i]
            if (oldRow._id == id) {
                schedule[0].availableRuns[i] = run
                break
            }
        }

        await this.ScheduleService.update(run.scheduleId, schedule[0])

        const updateRun: Run = await this.RunRepository.updateRun(id, run)
        return updateRun;
    }

    public delete = async (id: string) => {
        const run: Run[] = await this.RunRepository.findRunById(id);
        const schedule = await this.ScheduleService.findById(run[0].scheduleId)

        run[0].teams.forEach(async (team) => {
            await this.TeamService.delete(team._id)
        });
        run[0].bids.forEach(async (bid) => {
            await this.BidService.delete(bid._id)
        });

        const rowIndex = schedule[0].rows.findIndex(row => row._id == run[0]._id)
        if (rowIndex != 1)
            schedule[0].rows.splice(rowIndex, 1)

        await this.ScheduleService.update(schedule[0]._id, schedule[0])

        const deleteRun: any = await this.RunRepository.deleteRun(id)
        return deleteRun;
    }
}