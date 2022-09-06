import { neDB } from "../../cfg/db/neDb/nedb";
import { ScheduleRepository } from "../../repository/neDb/Schedule.repository";
import Schedule from "../../types/Schedule";

export class ScheduleService {
    private db: any;
    private ScheduleRepository: ScheduleRepository;

    constructor(neDB: neDB) {
        this.db = neDB.db.schedule;
        this.ScheduleRepository = new ScheduleRepository(this.db);
    }

    public find = async (): Promise<Schedule[]> => {
        const schedules: Schedule[] = await this.ScheduleRepository.findSchedules();
        return schedules;
    }

    public findById = async (id: string): Promise<Schedule[]> => {
        const schedule: Schedule[] = await this.ScheduleRepository.findScheduleById(id);
        return schedule;
    }

    public findByName = async (name: string): Promise<Schedule[]> => {
        const schedule: Schedule[] = await this.ScheduleRepository.findScheduleByName(name);
        return schedule;
    }

    public create = async (schedule: Schedule) => {
        const newSchedule: Schedule = await this.ScheduleRepository.addNewSchedule(schedule)
        return newSchedule;
    }

    public update = async (id: string, schedule: Schedule) => {
        const updateSchedule: Schedule = await this.ScheduleRepository.updateSchedule(id, schedule)
        return updateSchedule;
    }

    public delete = async (id: string) => {
        const deleteSchedule: any = await this.ScheduleRepository.deleteSchedule(id)
        return deleteSchedule;
    }
}