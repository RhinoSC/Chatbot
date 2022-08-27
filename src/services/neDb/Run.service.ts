import { RunRepository } from "../../repository/neDb/Run.repository";
import Run from "../../types/Run";

export class RunService {
    private db: any;
    private RunRepository: RunRepository;

    constructor(db: any) {
        this.db = db;
        this.RunRepository = new RunRepository(this.db);
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

    public update = async (id: string, run: Run) => {
        const updateRun: Run = await this.RunRepository.updateRun(id, run)
        return updateRun;
    }

    public delete = async (id: string) => {
        const deleteRun: any = await this.RunRepository.deleteRun(id)
        return deleteRun;
    }
}