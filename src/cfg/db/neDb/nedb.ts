// import { v4 as uuidv4 } from 'uuid';
var Datastore = require('nedb')

export class neDB {
    public db = {
        event: Datastore,
        schedule: Datastore,
        run: Datastore,
        user: Datastore,
        team: Datastore,
        bid: Datastore,
        donation: Datastore,
        prize: Datastore
    };

    constructor() {
        this.db.event = new Datastore({ filename: 'collections/event.db', autoload: true });
        this.db.schedule = new Datastore({ filename: 'docs/schedule.db', autoload: true });
        this.db.run = new Datastore({ filename: 'docs/run.db', autoload: true });
        this.db.user = new Datastore({ filename: 'docs/user.db', autoload: true });
        this.db.team = new Datastore({ filename: 'docs/team.db', autoload: true });
        this.db.bid = new Datastore({ filename: 'docs/bid.db', autoload: true });
        this.db.donation = new Datastore({ filename: 'docs/donation.db', autoload: true });
        this.db.prize = new Datastore({ filename: 'docs/prize.db', autoload: true });
    }


    // // event functions
    // public findEvents(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.event.find({}, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public findEventById(eventId: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.event.find({ _id: eventId }, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public findEventByName(eventName: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.event.find({ name: eventName }, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public addNewEvent(event: any): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.event.insert(event, async (err: any, newDoc: any) => {
    //             if (err) reject(err)
    //             console.log('[eventDB] Added new event')
    //             newDoc ? resolve(newDoc) : resolve(undefined)
    //         })
    //     })
    // }
    // public updateEvent(eventId: string, newEvent: any): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.event.update({ _id: eventId }, { $set: { ...newEvent } }, { returnUpdatedDocs: true }, (err: any, numAffected: any, affectedDocuments: any,) => {
    //             if (err) reject(err)
    //             console.log(`[eventDB] Updated event: ${eventId}, num of events updated: ${numAffected}`)
    //             affectedDocuments ? resolve(affectedDocuments) : resolve(undefined)
    //         })
    //     })
    // }
    // public deleteEvent(eventId: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.event.remove({ _id: eventId }, {}, (err: any, numRemoved: any) => {
    //             if (err) reject(err)
    //             console.log(`[eventDB] Removed event: ${eventId}, num of events removed: ${numRemoved}`)
    //             numRemoved > 0 ? resolve(numRemoved) : resolve(0)
    //         })
    //     })
    // }

    // // schedule functions
    // public findSchedule(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.schedule.find({}, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public findScheduleById(scheduleId: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.schedule.find({ _id: scheduleId }, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public findScheduleByName(scheduleName: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.schedule.find({ name: scheduleName }, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public addNewSchedule(schedule: any): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.schedule.insert(schedule, async (err: any, newDoc: any) => {
    //             if (err) reject(err)
    //             console.log('[scheduleDB] Added new schedule')
    //             newDoc ? resolve(newDoc) : resolve(undefined)
    //         })
    //     })
    // }
    // public updateSchedule(scheduleId: string, newSchedule: any): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.schedule.update({ _id: scheduleId }, { $set: { ...newSchedule } }, { returnUpdatedDocs: true }, (err: any, numAffected: any, affectedDocuments: any,) => {
    //             if (err) reject(err)
    //             console.log(`[scheduleDB] Updated schedule: ${scheduleId}, num of schedules updated: ${numAffected}`)
    //             affectedDocuments ? resolve(affectedDocuments) : resolve(undefined)
    //         })
    //     })
    // }
    // public deleteSchedule(scheduleId: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.schedule.remove({ _id: scheduleId }, {}, (err: any, numRemoved: any) => {
    //             if (err) reject(err)
    //             console.log(`[scheduleDB] Removed schedule: ${scheduleId}, num of schedules removed: ${numRemoved}`)
    //             numRemoved > 0 ? resolve(numRemoved) : resolve(0)
    //         })
    //     })
    // }


    // // run functions
    // public findRun(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.run.find({}, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public findRunById(runId: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.run.find({ _id: runId }, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public findRunByName(runName: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.run.find({ name: runName }, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public addNewRun(run: any): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.run.insert(run, async (err: any, newDoc: any) => {
    //             if (err) reject(err)
    //             console.log('[runDB] Added new run')
    //             newDoc ? resolve(newDoc) : resolve(undefined)
    //         })
    //     })
    // }
    // public updateRun(runId: string, newRun: any): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.run.update({ _id: runId }, { $set: { ...newRun } }, { returnUpdatedDocs: true }, (err: any, numAffected: any, affectedDocuments: any,) => {
    //             if (err) reject(err)
    //             console.log(`[runDB] Updated run: ${runId}, num of runs updated: ${numAffected}`)
    //             affectedDocuments ? resolve(affectedDocuments) : resolve(undefined)
    //         })
    //     })
    // }
    // public deleteRun(runId: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.run.remove({ _id: runId }, {}, (err: any, numRemoved: any) => {
    //             if (err) reject(err)
    //             console.log(`[runDB] Removed run: ${runId}, num of runs removed: ${numRemoved}`)
    //             numRemoved > 0 ? resolve(numRemoved) : resolve(0)
    //         })
    //     })
    // }

    // // user functions
    // public findUsers(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.user.find({}, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public findUserById(userId: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.user.find({ _id: userId }, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public findUserByName(userName: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.user.find({ name: userName }, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public addNewUser(user: any): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.user.insert(user, async (err: any, newDoc: any) => {
    //             if (err) reject(err)
    //             console.log('[userDB] Added new user')
    //             newDoc ? resolve(newDoc) : resolve(undefined)
    //         })
    //     })
    // }
    // public updateUser(userId: string, newUser: any): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.user.update({ _id: userId }, { $set: { ...newUser } }, { returnUpdatedDocs: true }, (err: any, numAffected: any, affectedDocuments: any,) => {
    //             if (err) reject(err)
    //             console.log(`[userDB] Updated user: ${userId}, num of users updated: ${numAffected}`)
    //             affectedDocuments ? resolve(affectedDocuments) : resolve(undefined)
    //         })
    //     })
    // }
    // public deleteUser(userId: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.user.remove({ _id: userId }, {}, (err: any, numRemoved: any) => {
    //             if (err) reject(err)
    //             console.log(`[userDB] Removed user: ${userId}, num of users removed: ${numRemoved}`)
    //             numRemoved > 0 ? resolve(numRemoved) : resolve(0)
    //         })
    //     })
    // }

    // // Team functions
    // public findTeam(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.team.find({}, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public findTeamById(teamId: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.team.find({ _id: teamId }, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public findTeamByName(teamName: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.team.find({ name: teamName }, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public addNewTeam(team: any): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.team.insert(team, async (err: any, newDoc: any) => {
    //             if (err) reject(err)
    //             console.log('[teamDB] Added new team')
    //             newDoc ? resolve(newDoc) : resolve(undefined)
    //         })
    //     })
    // }
    // public updateTeam(teamId: string, newTeam: any): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.team.update({ _id: teamId }, { $set: { ...newTeam } }, { returnUpdatedDocs: true }, (err: any, numAffected: any, affectedDocuments: any,) => {
    //             if (err) reject(err)
    //             console.log(`[teamDB] Updated team: ${teamId}, num of teams updated: ${numAffected}`)
    //             affectedDocuments ? resolve(affectedDocuments) : resolve(undefined)
    //         })
    //     })
    // }
    // public deleteTeam(teamId: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.team.remove({ _id: teamId }, {}, (err: any, numRemoved: any) => {
    //             if (err) reject(err)
    //             console.log(`[teamDB] Removed team: ${teamId}, num of teams removed: ${numRemoved}`)
    //             numRemoved > 0 ? resolve(numRemoved) : resolve(0)
    //         })
    //     })
    // }

    // // Bid functions
    // public findBid(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.bid.find({}, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public findBidById(bidId: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.bid.find({ _id: bidId }, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public findBidByName(bidName: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.bid.find({ name: bidName }, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public addNewBid(bid: any): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.bid.insert(bid, async (err: any, newDoc: any) => {
    //             if (err) reject(err)
    //             console.log('[bidDB] Added new bid')
    //             newDoc ? resolve(newDoc) : resolve(undefined)
    //         })
    //     })
    // }
    // public updateBid(bidId: string, newBid: any): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.bid.update({ _id: bidId }, { $set: { ...newBid } }, { returnUpdatedDocs: true }, (err: any, numAffected: any, affectedDocuments: any,) => {
    //             if (err) reject(err)
    //             console.log(`[bidDB] Updated bid: ${bidId}, num of bids updated: ${numAffected}`)
    //             affectedDocuments ? resolve(affectedDocuments) : resolve(undefined)
    //         })
    //     })
    // }
    // public deleteBid(bidId: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.bid.remove({ _id: bidId }, {}, (err: any, numRemoved: any) => {
    //             if (err) reject(err)
    //             console.log(`[bidDB] Removed bid: ${bidId}, num of bids removed: ${numRemoved}`)
    //             numRemoved > 0 ? resolve(numRemoved) : resolve(0)
    //         })
    //     })
    // }

    // // Donation functions
    // public findDonation(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.donation.find({}, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public findDonationById(donationId: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.donation.find({ _id: donationId }, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public findDonationByName(donationName: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.donation.find({ name: donationName }, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public addNewDonation(donation: any): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.donation.insert(donation, async (err: any, newDoc: any) => {
    //             if (err) reject(err)
    //             console.log('[donationDB] Added new donation')
    //             newDoc ? resolve(newDoc) : resolve(undefined)
    //         })
    //     })
    // }
    // public updateDonation(donationId: string, newDonation: any): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.donation.update({ _id: donationId }, { $set: { ...newDonation } }, { returnUpdatedDocs: true }, (err: any, numAffected: any, affectedDocuments: any,) => {
    //             if (err) reject(err)
    //             console.log(`[donationDB] Updated donation: ${donationId}, num of donations updated: ${numAffected}`)
    //             affectedDocuments ? resolve(affectedDocuments) : resolve(undefined)
    //         })
    //     })
    // }
    // public deleteDonation(donationId: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.donation.remove({ _id: donationId }, {}, (err: any, numRemoved: any) => {
    //             if (err) reject(err)
    //             console.log(`[donationDB] Removed donation: ${donationId}, num of donations removed: ${numRemoved}`)
    //             numRemoved > 0 ? resolve(numRemoved) : resolve(0)
    //         })
    //     })
    // }

    // // Prize functions
    // public findPrize(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.prize.find({}, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public findPrizeById(prizeId: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.prize.find({ _id: prizeId }, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public findPrizeByName(prizeName: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.prize.find({ name: prizeName }, (err: any, docs: any) => {
    //             if (err) reject(err)
    //             docs ? resolve(docs) : resolve(undefined)
    //         })
    //     })
    // }

    // public addNewPrize(prize: any): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.prize.insert(prize, async (err: any, newDoc: any) => {
    //             if (err) reject(err)
    //             console.log('[prizeDB] Added new prize')
    //             newDoc ? resolve(newDoc) : resolve(undefined)
    //         })
    //     })
    // }
    // public updatePrize(prizeId: string, newPrize: any): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.prize.update({ _id: prizeId }, { $set: { ...newPrize } }, { returnUpdatedDocs: true }, (err: any, numAffected: any, affectedDocuments: any,) => {
    //             if (err) reject(err)
    //             console.log(`[prizeDB] Updated prize: ${prizeId}, num of prizes updated: ${numAffected}`)
    //             affectedDocuments ? resolve(affectedDocuments) : resolve(undefined)
    //         })
    //     })
    // }
    // public deletePrize(prizeId: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.prize.remove({ _id: prizeId }, {}, (err: any, numRemoved: any) => {
    //             if (err) reject(err)
    //             console.log(`[prizeDB] Removed prize: ${prizeId}, num of prizes removed: ${numRemoved}`)
    //             numRemoved > 0 ? resolve(numRemoved) : resolve(0)
    //         })
    //     })
    // }
}