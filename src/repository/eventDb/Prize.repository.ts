export class UserRepository {
    private db: any;

    constructor(db: any) {
        this.db = db;
    }
    // Prize functions
    public findPrize(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.prize.find({}, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public findPrizeById(prizeId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.prize.find({ _id: prizeId }, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public findPrizeByName(prizeName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.prize.find({ name: prizeName }, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public addNewPrize(prize: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.prize.insert(prize, async (err: any, newDoc: any) => {
                if (err) reject(err)
                console.log('[prizeDB] Added new prize')
                newDoc ? resolve(newDoc) : resolve(undefined)
            })
        })
    }
    public updatePrize(prizeId: string, newPrize: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.prize.update({ _id: prizeId }, { $set: { ...newPrize } }, { returnUpdatedDocs: true }, (err: any, numAffected: any, affectedDocuments: any,) => {
                if (err) reject(err)
                console.log(`[prizeDB] Updated prize: ${prizeId}, num of prizes updated: ${numAffected}`)
                affectedDocuments ? resolve(affectedDocuments) : resolve(undefined)
            })
        })
    }
    public deletePrize(prizeId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.prize.remove({ _id: prizeId }, {}, (err: any, numRemoved: any) => {
                if (err) reject(err)
                console.log(`[prizeDB] Removed prize: ${prizeId}, num of prizes removed: ${numRemoved}`)
                numRemoved > 0 ? resolve(numRemoved) : resolve(0)
            })
        })
    }
}