export class EventRepository {
    private db: any;

    constructor(db: any) {
        this.db = db;
    }

    // event functions
    public findEvents(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public findEventById(eventId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find({ _id: eventId }, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public findEventByName(eventName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.find({ name: eventName }, (err: any, docs: any) => {
                if (err) reject(err)
                docs ? resolve(docs) : resolve(undefined)
            })
        })
    }

    public addNewEvent(event: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.insert(event, async (err: any, newDoc: any) => {
                if (err) reject(err)
                console.log('[eventDB] Added new event')
                newDoc ? resolve(newDoc) : resolve(undefined)
            })
        })
    }
    public updateEvent(eventId: string, newEvent: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.update({ _id: eventId }, { $set: { ...newEvent } }, { returnUpdatedDocs: true }, (err: any, numAffected: any, affectedDocuments: any,) => {
                if (err) reject(err)
                console.log(`[eventDB] Updated event: ${eventId}, num of events updated: ${numAffected}`)
                affectedDocuments ? resolve(affectedDocuments) : resolve(undefined)
            })
        })
    }
    public deleteEvent(eventId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: eventId }, {}, (err: any, numRemoved: any) => {
                if (err) reject(err)
                console.log(`[eventDB] Removed event: ${eventId}, num of events removed: ${numRemoved}`)
                numRemoved > 0 ? resolve(numRemoved) : resolve(0)
            })
        })
    }
}