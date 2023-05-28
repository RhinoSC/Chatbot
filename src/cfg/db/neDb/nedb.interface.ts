import { BidService } from "../../../services/neDb/Bid.service";
import { DonationService } from "../../../services/neDb/Donation.service";
import { EventService } from "../../../services/neDb/Event.service";
import { PrizeService } from "../../../services/neDb/Prize.service";
import { RunService } from "../../../services/neDb/Run.service";
import { ScheduleService } from "../../../services/neDb/Schedule.service";
import { TeamService } from "../../../services/neDb/Team.service";
import { UserService } from "../../../services/neDb/User.service";

var Datastore = require('nedb')

export interface neDB {
    db: {
        event: typeof Datastore,
        schedule: typeof Datastore,
        run: typeof Datastore,
        user: typeof Datastore,
        team: typeof Datastore,
        bid: typeof Datastore,
        donation: typeof Datastore,
        prize: typeof Datastore
    };

    services: {
        bidService: BidService,
        donationService: DonationService,
        eventService: EventService,
        prizeService: PrizeService,
        runService: RunService,
        scheduleService: ScheduleService,
        teamService: TeamService,
        userService: UserService,
    }

    controllers: {}

    createServices(): void

    createControllers(): void
}