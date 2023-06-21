import { EventRepository } from "../../repository/neDb/Event.repository";
import Event from "../../types/Event";
import nodecg from "../../cfg/nodecg";

export class EventService {
    private db: any;
    private EventRepository: EventRepository;

    constructor(db: any) {
        this.db = db;
        this.EventRepository = new EventRepository(this.db);
    }

    public find = async (): Promise<Event[]> => {
        const events: Event[] = await this.EventRepository.findEvents();
        return events;
    }

    public findById = async (id: string): Promise<Event[]> => {
        const event: Event[] = await this.EventRepository.findEventById(id);
        return event;
    }

    public findByName = async (name: string): Promise<Event[]> => {
        const event: Event[] = await this.EventRepository.findEventByName(name);
        return event;
    }

    public getIdByName = async (name: string): Promise<string> => {
        const event: Event[] = await this.EventRepository.findEventByName(name);
        return event[0]._id;
    }

    public create = async (event: Event) => {
        const newEvent: Event = await this.EventRepository.addNewEvent(event)
        return newEvent;
    }

    public update = async (id: string, event: Event) => {
        const updateEvent: Event = await this.EventRepository.updateEvent(id, event)

        try {
            console.log('enviar a layout')
            await nodecg.axios.post('/sre-event/update-event', { event: updateEvent })
        } catch (error) {
            console.error(error, 'Error sending to nodecg the event')
        }
        return updateEvent;
    }

    public delete = async (id: string) => {
        const deleteEvent: any = await this.EventRepository.deleteEvent(id)
        return deleteEvent;
    }
}