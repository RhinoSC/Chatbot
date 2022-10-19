import { DonationRepository } from "../../repository/neDb/Donation.repository";
import Donation from "../../types/Donation";

export class DonationService {
    private db: any;
    private DonationRepository: DonationRepository;

    constructor(db: any) {
        this.db = db;
        this.DonationRepository = new DonationRepository(this.db);
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
        return newDonation;
    }

    public update = async (id: string, donation: Donation) => {
        const updatedDonation: Donation = await this.DonationRepository.updateDonation(id, donation)
        return updatedDonation;
    }

    public delete = async (id: string) => {
        const deleteDonation: any = await this.DonationRepository.deleteDonation(id)
        return deleteDonation;
    }
}