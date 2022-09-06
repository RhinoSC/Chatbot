import { neDB } from "../../cfg/db/neDb/nedb";
import { BidRepository } from "../../repository/neDb/Bid.repository";
import Bid from "../../types/Bid"

export class BidService {
    private db: any;
    private BidRepository: BidRepository;

    constructor(neDB: neDB) {
        this.db = neDB.db.bid;
        this.BidRepository = new BidRepository(this.db);
    }

    public find = async (): Promise<Bid[]> => {
        const bids: Bid[] = await this.BidRepository.findBids();
        return bids;
    }

    public findById = async (id: string): Promise<Bid[]> => {
        const bid: Bid[] = await this.BidRepository.findBidById(id);
        return bid;
    }

    public findByName = async (name: string): Promise<Bid[]> => {
        const bid: Bid[] = await this.BidRepository.findBidByName(name);
        return bid;
    }

    public create = async (bid: Bid) => {
        const newBid: Bid = await this.BidRepository.addNewBid(bid)
        return newBid;
    }

    public update = async (id: string, bid: Bid) => {
        const updateBid: Bid = await this.BidRepository.updateBid(id, bid)
        return updateBid;
    }

    public delete = async (id: string) => {
        const deleteBid: any = await this.BidRepository.deleteBid(id)
        return deleteBid;
    }
}