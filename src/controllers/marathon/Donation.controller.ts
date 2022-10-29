import { Router, Request, Response } from "express";
import { checkJwt } from "../../middleware/authz.middleware";
import { checkPermissions } from "../../middleware/permissions.middleware";
import { BidService } from "../../services/neDb/Bid.service";
import { DonationService } from "../../services/neDb/Donation.service";
import { EventService } from "../../services/neDb/Event.service";
import { RunService } from "../../services/neDb/Run.service";
import { ScheduleService } from "../../services/neDb/Schedule.service";
import Donation from "../../types/Donation";
import Event from "../../types/Event";
import Run from "../../types/Run";
import Schedule from "../../types/Schedule";
import Services from "../../types/Services";
import { permissions } from "../../utils/enums/role.enum";

export class DonationController {
    public router: Router;
    private donationService: DonationService;
    private eventService: EventService;
    private runService: RunService;
    private bidService: BidService;
    private scheduleService: ScheduleService;

    constructor(donationService: DonationService, services: Services) {
        this.router = Router();
        this.donationService = donationService;
        this.eventService = services.eventService;
        this.runService = services.runService;
        this.bidService = services.bidService;
        this.scheduleService = services.scheduleService
        // this.updateBidTypeTotal()
        this.routes();
    }

    public hola = async (req: Request, res: Response) => {
        console.log('funcione')
        res.json('donations');
    }
    public index = async (req: Request, res: Response) => {
        const donations = await this.donationService.find()
        res.json(donations);
    }

    public indexId = async (req: Request, res: Response) => {
        const id = req['params']['id'];
        const donation = await this.donationService.findById(id)
        console.log(donation);
        res.json(donation);
    }

    public create = async (req: Request, res: Response) => {
        const donation = req['body'].donation as Donation;
        const newDonation = await this.donationService.create(donation);

        if (newDonation._id) {
            const event = await this.eventService.findById(newDonation.eventId)
            event[0].isCharityData.totalDonated += Number(newDonation.amount)
            event[0].donations.push(newDonation)
            this.eventService.update(event[0]._id, event[0])


            this.updateBidTypeTotal()
        }

        res.status(201).json(newDonation)
    }

    public update = async (req: Request, res: Response) => {
        const donation = req['body'].donation as Donation;
        const id = req['params']['id'];

        const updatedDonation = await this.donationService.update(id, donation)

        if (updatedDonation._id) {
            const event = await this.eventService.findById(updatedDonation.eventId)
            event[0].isCharityData.totalDonated += Number(updatedDonation.amount)
            const idx = event[0].donations.findIndex(don => don._id === updatedDonation._id)
            if (idx !== -1) {
                event[0].donations[idx] = updatedDonation
            } else {
                event[0].donations.push(updatedDonation)
            }
            this.eventService.update(event[0]._id, event[0])
        }

        res.status(201).json(updatedDonation);
    }

    public delete = async (req: Request, res: Response) => {
        const id = req['params']['id'];

        const donation: Donation[] = await this.donationService.findById(id);

        if (donation[0]._id) {
            const event = await this.eventService.findById(donation[0].eventId)
            event[0].isCharityData.totalDonated -= Number(donation[0].amount)
            const idx = event[0].donations.findIndex(don => don._id === donation[0]._id)
            if (idx !== -1) {
                event[0].donations.splice(idx, 1)
                this.eventService.update(event[0]._id, event[0])
            }
        }

        const numDeleted = await this.donationService.delete(id)

        res.status(200).json({ deletedDonation: donation, num: numDeleted });
    }

    public routes() {
        this.router.get('/all', this.index);
        this.router.get('/one/:id', this.indexId);
        this.router.post('/public', this.create);
        this.router.use(checkJwt);
        this.router.use(checkPermissions([permissions["create:all"], permissions["read:all"], permissions["update:all"]]))
        this.router.post('/one', this.create);
        this.router.put('/one/:id', this.update);
        this.router.delete('/one/:id', this.delete);
    }

    async updateBidTypeTotal() {
        const bids = await this.bidService.findByType(2)
        const event = await this.eventService.findByName('sre9')
        for (let i = 0; i < bids.length; i++) {
            const oldBid = bids[i];
            let run = await this.runService.findById(oldBid.runId)
            if (run[0]) {
                const index = run[0].bids.findIndex(bid => bid._id === oldBid._id)
                run[0].bids[index].current = event[0].isCharityData.totalDonated
                // console.log(oldBid.game)
                // console.log(run[0].bids[index])
                // console.log(index)
                if (index !== -1) {
                    this.updateScheduleAndEvent(index, run[0], event[0])
                }
            }
        }

    }

    async updateScheduleAndEvent(index: number, run: Run, event: Event) {
        const schedule = event.schedule

        if (schedule) {
            await this.bidService.update(run.bids[index]._id, run.bids[index])
            await this.runService.update(run._id, run)

            let founded = false

            for (let i = 0; i < schedule.rows.length; i++) {
                const oldRow = schedule.rows[i]
                if (oldRow.row._id == run._id) {
                    console.log('founded')
                    schedule.rows[i].row = run
                    console.log(schedule.rows[i].row.bids[index])
                    founded = true
                    break
                }
            }

            // if (!founded) {
            //     for (let i = 0; i < schedule.availableRuns.length; i++) {
            //         const oldRow = schedule.availableRuns[i]
            //         if (oldRow._id == run._id) {
            //             schedule.availableRuns[i] = run
            //             break
            //         }
            //     }
            // }
            await this.scheduleService.update(schedule._id, schedule)

            event.schedule = schedule
            this.eventService.update(event._id, event)
        }
    }
}