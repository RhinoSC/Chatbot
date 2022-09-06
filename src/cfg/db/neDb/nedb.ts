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
        this.db.schedule = new Datastore({ filename: 'collections/schedule.db', autoload: true });
        this.db.run = new Datastore({ filename: 'collections/run.db', autoload: true });
        this.db.user = new Datastore({ filename: 'collections/user.db', autoload: true });
        this.db.team = new Datastore({ filename: 'collections/team.db', autoload: true });
        this.db.bid = new Datastore({ filename: 'collections/bid.db', autoload: true });
        this.db.donation = new Datastore({ filename: 'collections/donation.db', autoload: true });
        this.db.prize = new Datastore({ filename: 'collections/prize.db', autoload: true });
    }
}