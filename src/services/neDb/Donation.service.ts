import { neDBObject } from "../../cfg/db/neDb/nedb";
import { DonationRepository } from "../../repository/neDb/Donation.repository";
import Donation from "../../types/Donation";
import { EventService } from "./Event.service";

export class DonationService {
    private db: any;
    private DonationRepository: DonationRepository;
    private EventService: EventService;

    constructor(db: any) {
        this.db = db;
        this.DonationRepository = new DonationRepository(this.db);
        this.EventService = neDBObject.services.eventService
    }

    public find = async (): Promise<Donation[]> => {
        const donations: Donation[] = await this.DonationRepository.findDonations();
        return donations;
    }

    public findById = async (id: string): Promise<Donation[]> => {
        const donation: Donation[] = await this.DonationRepository.findDonationById(id);
        return donation;
    }

    public findByName = async (name: string): Promise<Donation[]> => {
        const donation: Donation[] = await this.DonationRepository.findDonationByName(name);
        return donation;
    }

    public create = async (donation: Donation) => {
        const newDonation: Donation = await this.DonationRepository.addNewDonation(donation)

        if (newDonation._id) {
            const event = await this.EventService.findById(newDonation.eventId)
            event[0].donations.push(newDonation)
            this.EventService.update(event[0]._id, event[0])
        }

        return newDonation;
    }

    public update = async (id: string, donation: Donation) => {
        const updateDonation: Donation = await this.DonationRepository.updateDonation(id, donation)

        if (updateDonation._id) {
            const event = await this.EventService.findById(updateDonation.eventId)
            const idx = event[0].donations.findIndex(don => don._id === updateDonation._id)
            if (idx !== -1) {
                event[0].donations[idx] = updateDonation
                this.EventService.update(event[0]._id, event[0])
            }
            this.EventService.update(event[0]._id, event[0])
        }

        return updateDonation;
    }

    public delete = async (id: string) => {
        const donation: Donation[] = await this.DonationRepository.findDonationById(id);

        if (donation[0]._id) {
            const event = await this.EventService.findById(donation[0].eventId)
            const idx = event[0].donations.findIndex(don => don._id === donation[0]._id)
            if (idx !== -1) {
                event[0].donations.splice(idx, 1)
                this.EventService.update(event[0]._id, event[0])
            }
        }

        const deleteDonation: any = await this.DonationRepository.deleteDonation(id)
        return deleteDonation;
    }
}