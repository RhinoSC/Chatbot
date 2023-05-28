import { BidController } from "../../../controllers/marathon/Bid.controller";
import { DonationController } from "../../../controllers/marathon/Donation.controller";
import { EventController } from "../../../controllers/marathon/Event.controller";
import { PrizeController } from "../../../controllers/marathon/Prize.controller";
import { RunController } from "../../../controllers/marathon/Run.controller";
import { ScheduleController } from "../../../controllers/marathon/Schedule.controller";
import { TeamController } from "../../../controllers/marathon/Team.controller";
import { UserController } from "../../../controllers/marathon/User.controller";
import { BidService } from "../../../services/neDb/Bid.service";
import { DonationService } from "../../../services/neDb/Donation.service";
import { EventService } from "../../../services/neDb/Event.service";
import { PrizeService } from "../../../services/neDb/Prize.service";
import { RunService } from "../../../services/neDb/Run.service";
import { ScheduleService } from "../../../services/neDb/Schedule.service";
import { TeamService } from "../../../services/neDb/Team.service";
import { UserService } from "../../../services/neDb/User.service";

var Datastore = require('nedb')
import { neDB as neDBInterface } from "./nedb.interface";

class neDB implements neDBInterface {
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

    public services = {
        bidService: {} as BidService,
        donationService: {} as DonationService,
        eventService: {} as EventService,
        prizeService: {} as PrizeService,
        runService: {} as RunService,
        scheduleService: {} as ScheduleService,
        teamService: {} as TeamService,
        userService: {} as UserService,
    }

    public controllers = {
        bidController: {} as BidController,
        donationController: {} as DonationController,
        eventController: {} as EventController,
        prizeController: {} as PrizeController,
        runController: {} as RunController,
        scheduleController: {} as ScheduleController,
        teamController: {} as TeamController,
        userController: {} as UserController,
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

    public createServices() {
        this.services.userService = new UserService(this.db.user)
        this.services.teamService = new TeamService(this.db.team)
        this.services.bidService = new BidService(this.db.bid)
        this.services.eventService = new EventService(this.db.event)
        this.services.donationService = new DonationService(this.db.donation)
        this.services.prizeService = new PrizeService(this.db.prize)
        this.services.scheduleService = new ScheduleService(this.db.schedule)
        this.services.runService = new RunService(this.db.run)
    }

    public createControllers() {
        this.controllers = {
            userController: new UserController(this.services.userService, this.services),
            teamController: new TeamController(this.services.teamService, this.services),
            bidController: new BidController(this.services.bidService, this.services),
            donationController: new DonationController(this.services.donationService, this.services),
            eventController: new EventController(this.services.eventService, this.services),
            prizeController: new PrizeController(this.services.prizeService, this.services),
            scheduleController: new ScheduleController(this.services.scheduleService, this.services),
            runController: new RunController(this.services.runService, this.services),
        };
    }
}

const neDBObject = new neDB()
neDBObject.createServices()
neDBObject.createControllers()

export { neDBObject }