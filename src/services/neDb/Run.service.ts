import { neDB } from "../../cfg/db/neDb/nedb";
import { RunRepository } from "../../repository/neDb/Run.repository";
import Run from "../../types/Run";
import { BidService } from "./Bid.service";
import { TeamService } from "./Team.service";
import { UserService } from "./User.service";

export class RunService {
    private db: any;
    private RunRepository: RunRepository;
    private BidService: BidService;

    constructor(neDB: neDB) {
        this.db = neDB.db.run;
        this.RunRepository = new RunRepository(this.db);
        this.BidService = new BidService(neDB.db.bid)
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

        run.bids.forEach(async (bid) => {
            await this.BidService.create(bid)
        })

        const newRun: Run = await this.RunRepository.addNewRun(run)
        return newRun;
        // return true
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