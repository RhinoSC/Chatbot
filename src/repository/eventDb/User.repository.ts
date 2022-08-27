export class UserRepository {
    private db: any;

    constructor(db: any) {
        this.db = db;
    }

    // user functions
    public findUsers(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public findUserById(userId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find({ _id: userId }, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public findUserByName(userName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find({ name: userName }, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public addNewUser(user: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.insert(user, async (err: any, newDoc: any) => {
                if (err) reject(err)
                console.log('[userDB] Added new user')
                newDoc ? resolve(newDoc) : resolve(undefined)
            })
        })
    }
    public updateUser(userId: string, newUser: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.update({ _id: userId }, { $set: { ...newUser } }, { returnUpdatedDocs: true }, (err: any, numAffected: any, affectedDocuments: any,) => {
                if (err) reject(err)
                console.log(`[userDB] Updated user: ${userId}, num of users updated: ${numAffected}`)
                affectedDocuments ? resolve(affectedDocuments) : resolve(undefined)
            })
        })
    }
    public deleteUser(userId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: userId }, {}, (err: any, numRemoved: any) => {
                if (err) reject(err)
                console.log(`[userDB] Removed user: ${userId}, num of users removed: ${numRemoved}`)
                numRemoved > 0 ? resolve(numRemoved) : resolve(0)
            })
        })
    }
}