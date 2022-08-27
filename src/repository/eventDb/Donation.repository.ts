export class UserRepository {
    private db: any;

    constructor(db: any) {
        this.db = db;
    }

    // Donation functions
    public findDonation(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public findDonationById(donationId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find({ _id: donationId }, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public findDonationByName(donationName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find({ name: donationName }, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public addNewDonation(donation: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.insert(donation, async (err: any, newDoc: any) => {
                if (err) reject(err)
                console.log('[donationDB] Added new donation')
                newDoc ? resolve(newDoc) : resolve(undefined)
            })
        })
    }
    public updateDonation(donationId: string, newDonation: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.update({ _id: donationId }, { $set: { ...newDonation } }, { returnUpdatedDocs: true }, (err: any, numAffected: any, affectedDocuments: any,) => {
                if (err) reject(err)
                console.log(`[donationDB] Updated donation: ${donationId}, num of donations updated: ${numAffected}`)
                affectedDocuments ? resolve(affectedDocuments) : resolve(undefined)
            })
        })
    }
    public deleteDonation(donationId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: donationId }, {}, (err: any, numRemoved: any) => {
                if (err) reject(err)
                console.log(`[donationDB] Removed donation: ${donationId}, num of donations removed: ${numRemoved}`)
                numRemoved > 0 ? resolve(numRemoved) : resolve(0)
            })
        })
    }
}