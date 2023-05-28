export class ScheduleRepository {
    private db: any;

    constructor(db: any) {
        this.db = db;
    }

    // schedule functions
    public findSchedules(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public findScheduleById(scheduleId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find({ _id: scheduleId }, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public findScheduleByName(scheduleName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find({ name: scheduleName }, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public addNewSchedule(schedule: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.insert(schedule, async (err: any, newDoc: any) => {
                if (err) reject(err)
                console.log('[scheduleDB] Added new schedule')
                newDoc ? resolve(newDoc) : resolve(undefined)
            })
        })
    }
    public updateSchedule(scheduleId: string, newSchedule: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.update({ _id: scheduleId }, { $set: { ...newSchedule } }, { returnUpdatedDocs: true }, (err: any, numAffected: any, affectedDocuments: any,) => {
                if (err) reject(err)
                console.log(`[scheduleDB] Updated schedule: ${scheduleId}, num of schedules updated: ${numAffected}`)
                affectedDocuments ? resolve(affectedDocuments) : resolve(undefined)
            })
        })
    }
    public deleteSchedule(scheduleId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: scheduleId }, {}, (err: any, numRemoved: any) => {
                if (err) reject(err)
                console.log(`[scheduleDB] Removed schedule: ${scheduleId}, num of schedules removed: ${numRemoved}`)
                numRemoved > 0 ? resolve(numRemoved) : resolve(0)
            })
        })
    }
}