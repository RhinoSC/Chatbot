import { Router, Request, Response } from "express";
import { BidService } from "../../services/neDb/Bid.service";
import { RunService } from "../../services/neDb/Run.service";
import { ScheduleService } from "../../services/neDb/Schedule.service";
import { TeamService } from "../../services/neDb/Team.service";
import Run from "../../types/Run";
import Bid from "../../types/Bid";
import Services from "../../types/Services";
import { EventService } from "../../services/neDb/Event.service";
import { checkJwt } from "../../middleware/authz.middleware";
import { checkPermissions } from "../../middleware/permissions.middleware";
import { permissions } from "../../utils/enums/role.enum";

export class RunController {
    public router: Router;
    private runService: RunService;
    private bidService: BidService;
    private scheduleService: ScheduleService;
    private teamService: TeamService;
    private eventService: EventService;

    constructor(runService: RunService, services: Services) {
        this.router = Router();
        this.runService = runService;
        this.bidService = services.bidService
        this.scheduleService = services.scheduleService
        this.teamService = services.teamService
        this.eventService = services.eventService
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        const runs = await this.runService.find()
        res.json(runs);
    }

    public indexId = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const run = await this.runService.findById(id)
        console.log(run);
        res.json(run);
    }

    public create = async (req: Request, res: Response) => {
        const run = req['body'].run as Run;
        const newRun = await this.runService.create(run);
        res.status(201).json(newRun)
    }

    public createWithBidsAndTeams = async (req: Request, res: Response) => {
        const run = req['body'].run as Run;

        const schedule = await this.scheduleService.findById(run.scheduleId)

        let newRun = await this.runService.create(run);

        for (let i = 0; i < run.teams.length; i++) {
            const team = run.teams[i];

            team.eventId = schedule[0].eventId
            team.runId = newRun._id
            const savedTeam = await this.teamService.create(team)
            newRun.teams[i] = savedTeam
        }

        for (let i = 0; i < run.bids.length; i++) {
            const bid: Bid = run.bids[i]

            bid.eventId = schedule[0].eventId
            bid.runId = newRun._id
            const savedBid = await this.bidService.create(bid)
            newRun.bids[i] = savedBid
        }

        newRun = await this.runService.update(newRun._id, newRun)

        schedule[0].availableRuns.push(newRun)

        const updatedSchedule = await this.scheduleService.update(run.scheduleId, schedule[0])

        const event = await this.eventService.findById(updatedSchedule.eventId)
        event[0].schedule = updatedSchedule
        this.eventService.update(event[0]._id, event[0])

        res.status(201).json(newRun)
    }

    public update = async (req: Request, res: Response) => {
        const run = req['body'].run as Run;
        const id = req['params']['id'];

        const schedule = await this.scheduleService.findById(run.scheduleId)

        let founded = false

        for (let i = 0; i < schedule[0].rows.length; i++) {
            const oldRow = schedule[0].rows[i]
            if (oldRow.row._id == id) {
                schedule[0].rows[i].row = run
                founded = true
                break
            }
        }

        if (!founded) {
            for (let i = 0; i < schedule[0].availableRuns.length; i++) {
                const oldRow = schedule[0].availableRuns[i]
                if (oldRow._id == id) {
                    schedule[0].availableRuns[i] = run
                    break
                }
            }
        }

        const updatedRun = await this.runService.update(id, run)

        const updatedSchedule = await this.scheduleService.update(run.scheduleId, schedule[0])

        const event = await this.eventService.findById(updatedSchedule.eventId)
        event[0].schedule = updatedSchedule
        this.eventService.update(event[0]._id, event[0])

        res.status(201).json(updatedRun);
    }

    public updateWithBidsAndTeams = async (req: Request, res: Response) => {
        const run = req['body'].run as Run;
        const id = req['params']['id'];

        const oldRun: Run[] = await this.runService.findById(id)

        const schedule = await this.scheduleService.findById(run.scheduleId)

        for (let i = 0; i < oldRun[0].teams.length; i++) {
            const oldTeamIndex = run.teams.findIndex(team => team._id == oldRun[0].teams[i]._id)
            if (oldTeamIndex == -1) {
                await this.teamService.delete(oldRun[0].teams[i]._id)
            }
        }

        for (let i = 0; i < run.teams.length; i++) {
            const newTeam = run.teams[i];
            const oldTeamIndex = oldRun[0].teams.findIndex(team => team._id == newTeam._id)
            if (oldTeamIndex != -1) {
                const updatedTeam = await this.teamService.update(newTeam._id, newTeam)
                run.teams[i] = updatedTeam
            } else {
                const createdTeam = await this.teamService.create(newTeam)
                run.teams[i] = createdTeam
            }
        }

        for (let i = 0; i < oldRun[0].bids.length; i++) {
            const oldBidIndex = run.bids.findIndex(bid => bid._id == oldRun[0].bids[i]._id)
            if (oldBidIndex == -1) {
                await this.bidService.delete(oldRun[0].bids[i]._id)
            }
        }

        for (let i = 0; i < run.bids.length; i++) {
            const newBid = run.bids[i];
            const oldBidIndex = oldRun[0].bids.findIndex(bid => bid._id == newBid._id)
            if (oldBidIndex != -1) {
                const updatedBid = await this.bidService.update(newBid._id, newBid)
                run.bids[i] = updatedBid
            } else {
                const createdBid = await this.bidService.create(newBid)
                run.bids[i] = createdBid
            }
        }

        let founded = false

        for (let i = 0; i < schedule[0].rows.length; i++) {
            const oldRow = schedule[0].rows[i]
            if (oldRow.row._id == id) {
                schedule[0].rows[i].row = run
                founded = true
                break
            }
        }

        if (!founded) {
            for (let i = 0; i < schedule[0].availableRuns.length; i++) {
                const oldRow = schedule[0].availableRuns[i]
                if (oldRow._id == id) {
                    schedule[0].availableRuns[i] = run
                    break
                }
            }
        }

        const updatedRun = await this.runService.update(id, run)

        const updatedSchedule = await this.scheduleService.update(run.scheduleId, schedule[0])

        const event = await this.eventService.findById(updatedSchedule.eventId)
        event[0].schedule = updatedSchedule
        this.eventService.update(event[0]._id, event[0])

        res.status(201).json(updatedRun);
    }

    public updateWithBids = async (req: Request, res: Response) => {
        const run = req['body'].run as Run;
        const id = req['params']['id'];

        const oldRun: Run[] = await this.runService.findById(id)

        const schedule = await this.scheduleService.findById(run.scheduleId)

        for (let i = 0; i < oldRun[0].bids.length; i++) {
            const oldBidIndex = run.bids.findIndex(bid => bid._id == oldRun[0].bids[i]._id)
            if (oldBidIndex == -1) {
                await this.bidService.delete(oldRun[0].bids[i]._id)
            }
        }

        for (let i = 0; i < run.bids.length; i++) {
            const newBid = run.bids[i];
            const oldBidIndex = oldRun[0].bids.findIndex(bid => bid._id == newBid._id)
            if (oldBidIndex != -1) {
                const updatedBid = await this.bidService.update(newBid._id, newBid)
                run.bids[i] = updatedBid
            } else {
                const createdBid = await this.bidService.create(newBid)
                run.bids[i] = createdBid
            }
        }

        let founded = false

        for (let i = 0; i < schedule[0].rows.length; i++) {
            const oldRow = schedule[0].rows[i]
            if (oldRow.row._id == id) {
                schedule[0].rows[i].row = run
                founded = true
                break
            }
        }

        if (!founded) {
            for (let i = 0; i < schedule[0].availableRuns.length; i++) {
                const oldRow = schedule[0].availableRuns[i]
                if (oldRow._id == id) {
                    schedule[0].availableRuns[i] = run
                    break
                }
            }
        }

        const updatedRun = await this.runService.update(id, run)

        const updatedSchedule = await this.scheduleService.update(run.scheduleId, schedule[0])

        const event = await this.eventService.findById(updatedSchedule.eventId)
        event[0].schedule = updatedSchedule
        this.eventService.update(event[0]._id, event[0])

        res.status(201).json(updatedRun);
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['id'];

        const run: Run[] = await this.runService.findById(id);
        const schedule = await this.scheduleService.findById(run[0].scheduleId)

        for (let i = 0; i < run[0].teams.length; i++) {
            await this.teamService.delete(run[0].teams[i]._id)
        }

        for (let i = 0; i < run[0].bids.length; i++) {
            await this.bidService.delete(run[0].bids[i]._id)
        }

        let founded = false

        if (schedule[0].rows.length > 0) {
            const rowIndex = schedule[0].rows.findIndex(scheduleRow => scheduleRow.row._id == run[0]._id)
            if (rowIndex != 1) {
                schedule[0].rows.splice(rowIndex, 1)
                founded = true
            }
        }

        if (!founded) {
            if (schedule[0].availableRuns.length > 0) {
                const availableRunIndex = schedule[0].availableRuns.findIndex(row => row._id == run[0]._id)
                if (availableRunIndex != 1)
                    schedule[0].availableRuns.splice(availableRunIndex, 1)
            }
        }

        const updatedSchedule = await this.scheduleService.update(run[0].scheduleId, schedule[0])

        const event = await this.eventService.findById(updatedSchedule.eventId)
        event[0].schedule = updatedSchedule
        this.eventService.update(event[0]._id, event[0])

        const numDeleted = await this.runService.delete(id)

        res.status(200).json({ deletedRun: run, num: numDeleted });
    }

    public routes() {
        this.router.get('/all', this.index);
        this.router.get('/one/:id', this.indexId);
        this.router.put('/bids/:id', this.updateWithBids);
        this.router.use(checkJwt);
        this.router.use(checkPermissions([permissions["create:all"], permissions["read:all"], permissions["update:all"]]))
        this.router.post('/one', this.create);
        this.router.post('/advanced', this.createWithBidsAndTeams);
        this.router.put('/one/advanced/:id', this.updateWithBidsAndTeams);
        this.router.put('/one/:id', this.update);
        this.router.delete('/one/:id', this.delete);
    }
}