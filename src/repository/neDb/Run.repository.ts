export class RunRepository {
    private db: any;

    constructor(db: any) {
        this.db = db;
    }

    // run functions
    public findRuns(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public findRunById(runId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find({ _id: runId }, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public findRunByName(runName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find({ name: runName }, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public addNewRun(run: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.insert(run, async (err: any, newDoc: any) => {
                if (err) reject(err)
                console.log('[runDB] Added new run')
                newDoc ? resolve(newDoc) : resolve(undefined)
            })
        })
    }
    public updateRun(runId: string, newRun: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.update({ _id: runId }, { $set: { ...newRun } }, { returnUpdatedDocs: true }, (err: any, numAffected: any, affectedDocuments: any,) => {
                if (err) reject(err)
                console.log(`[runDB] Updated run: ${runId}, num of runs updated: ${numAffected}`)
                affectedDocuments ? resolve(affectedDocuments) : resolve(undefined)
            })
        })
    }
    public deleteRun(runId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: runId }, {}, (err: any, numRemoved: any) => {
                if (err) reject(err)
                console.log(`[runDB] Removed run: ${runId}, num of runs removed: ${numRemoved}`)
                numRemoved > 0 ? resolve(numRemoved) : resolve(0)
            })
        })
    }
}