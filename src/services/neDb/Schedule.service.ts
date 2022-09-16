import { neDBObject } from "../../cfg/db/neDb/nedb";
import { ScheduleRepository } from "../../repository/neDb/Schedule.repository";
import Schedule from "../../types/Schedule";
import { EventService } from "./Event.service";

export class ScheduleService {
    private db: any;
    private ScheduleRepository: ScheduleRepository;
    private EventService: EventService

    constructor(db: any) {
        this.db = db;
        this.ScheduleRepository = new ScheduleRepository(this.db);
        this.EventService = neDBObject.services.eventService
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

        if (updateSchedule.eventId) {
            const event = await this.EventService.findById(updateSchedule.eventId)
            event[0].schedule = updateSchedule
            this.EventService.update(event[0]._id, event[0])
        }

        return updateSchedule;
    }

    public delete = async (id: string) => {
        const schedule: Schedule[] = await this.ScheduleRepository.findScheduleById(id)

        const event = await this.EventService.findById(schedule[0].eventId)

        event[0].schedule = undefined

        await this.EventService.update(event[0]._id, event[0])

        const deleteSchedule: any = await this.ScheduleRepository.deleteSchedule(id)
        return deleteSchedule;
    }
}