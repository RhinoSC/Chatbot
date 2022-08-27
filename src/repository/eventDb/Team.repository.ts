export class UserRepository {
    private db: any;

    constructor(db: any) {
        this.db = db;
    }

    // Team functions
    public findTeam(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public findTeamById(teamId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find({ _id: teamId }, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public findTeamByName(teamName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find({ name: teamName }, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public addNewTeam(team: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.insert(team, async (err: any, newDoc: any) => {
                if (err) reject(err)
                console.log('[teamDB] Added new team')
                newDoc ? resolve(newDoc) : resolve(undefined)
            })
        })
    }
    public updateTeam(teamId: string, newTeam: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.update({ _id: teamId }, { $set: { ...newTeam } }, { returnUpdatedDocs: true }, (err: any, numAffected: any, affectedDocuments: any,) => {
                if (err) reject(err)
                console.log(`[teamDB] Updated team: ${teamId}, num of teams updated: ${numAffected}`)
                affectedDocuments ? resolve(affectedDocuments) : resolve(undefined)
            })
        })
    }
    public deleteTeam(teamId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: teamId }, {}, (err: any, numRemoved: any) => {
                if (err) reject(err)
                console.log(`[teamDB] Removed team: ${teamId}, num of teams removed: ${numRemoved}`)
                numRemoved > 0 ? resolve(numRemoved) : resolve(0)
            })
        })
    }
}