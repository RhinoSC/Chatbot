export class UserRepository {
    private db: any;

    constructor(db: any) {
        this.db = db;
    }

    // Bid functions
    public findBid(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public findBidById(bidId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find({ _id: bidId }, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public findBidByName(bidName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find({ name: bidName }, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public addNewBid(bid: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.insert(bid, async (err: any, newDoc: any) => {
                if (err) reject(err)
                console.log('[bidDB] Added new bid')
                newDoc ? resolve(newDoc) : resolve(undefined)
            })
        })
    }
    public updateBid(bidId: string, newBid: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.update({ _id: bidId }, { $set: { ...newBid } }, { returnUpdatedDocs: true }, (err: any, numAffected: any, affectedDocuments: any,) => {
                if (err) reject(err)
                console.log(`[bidDB] Updated bid: ${bidId}, num of bids updated: ${numAffected}`)
                affectedDocuments ? resolve(affectedDocuments) : resolve(undefined)
            })
        })
    }
    public deleteBid(bidId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: bidId }, {}, (err: any, numRemoved: any) => {
                if (err) reject(err)
                console.log(`[bidDB] Removed bid: ${bidId}, num of bids removed: ${numRemoved}`)
                numRemoved > 0 ? resolve(numRemoved) : resolve(0)
            })
        })
    }
}
