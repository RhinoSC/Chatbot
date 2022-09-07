import { neDBObject } from "../../cfg/db/neDb/nedb";
import { PrizeRepository } from "../../repository/neDb/Prize.repository";
import Prize from "../../types/Prize";
import { EventService } from "./Event.service";

export class PrizeService {
    private db: any;
    private PrizeRepository: PrizeRepository;
    private EventService: EventService

    constructor(db: any) {
        this.db = db;
        this.PrizeRepository = new PrizeRepository(this.db);
        this.EventService = neDBObject.services.eventService
    }

    public find = async (): Promise<Prize[]> => {
        const prizes: Prize[] = await this.PrizeRepository.findPrizes();
        return prizes;
    }

    public findById = async (id: string): Promise<Prize[]> => {
        const prize: Prize[] = await this.PrizeRepository.findPrizeById(id);
        return prize;
    }

    public findByName = async (name: string): Promise<Prize[]> => {
        const prize: Prize[] = await this.PrizeRepository.findPrizeByName(name);
        return prize;
    }

    public create = async (prize: Prize) => {
        const event = await this.EventService.findById(prize.eventId)

        const newPrize: Prize = await this.PrizeRepository.addNewPrize(prize)

        event[0].prizes.push(newPrize)

        await this.EventService.update(event[0]._id, event[0])

        return newPrize;
    }

    public update = async (id: string, prize: Prize) => {
        const updatePrize: Prize = await this.PrizeRepository.updatePrize(id, prize)

        const event = await this.EventService.findById(updatePrize.eventId)

        for (let i = 0; i < event[0].prizes.length; i++) {
            const oldPrize = event[0].prizes[i]
            if (oldPrize._id == id) {
                event[0].prizes[i] = updatePrize
                break
            }
        }

        await this.EventService.update(event[0]._id, event[0])

        return updatePrize;
    }

    public delete = async (id: string) => {
        const oldPrize = await this.PrizeRepository.findPrizeById(id)

        const event = await this.EventService.findById(oldPrize[0].eventId)

        const prizeIndex = event[0].prizes.findIndex(prize => prize._id == oldPrize[0]._id)
        if (prizeIndex != 1)
            event[0].prizes.splice(prizeIndex, 1)

        await this.EventService.update(event[0]._id, event[0])

        const deletePrize: any = await this.PrizeRepository.deletePrize(id)
        return deletePrize;
    }
}