import { PrizeRepository } from "../../repository/neDb/Prize.repository";
import Prize from "../../types/Prize";

export class PrizeService {
    private db: any;
    private PrizeRepository: PrizeRepository;

    constructor(db: any) {
        this.db = db;
        this.PrizeRepository = new PrizeRepository(this.db);
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
        const newPrize: Prize = await this.PrizeRepository.addNewPrize(prize)
        return newPrize;
    }

    public update = async (id: string, prize: Prize) => {
        const updatePrize: Prize = await this.PrizeRepository.updatePrize(id, prize)
        return updatePrize;
    }

    public delete = async (id: string) => {
        const deletePrize: any = await this.PrizeRepository.deletePrize(id)
        return deletePrize;
    }
}