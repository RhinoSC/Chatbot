export class Timer {
    public id:number;
    public name:string;
    public call:string;
    public time:number;
    public active:number;
    public lastTime:string;
    public description:string;
    public message:string;

    constructor(id:number, name:string, call:string, time:number, active:number, lastTime:string, description:string, message:string) {
        this.id = id;
        this.name = name;
        this.call = call;
        this.time = time;
        this.active = active;
        this.lastTime = lastTime;
        this.description = description;
        this.message = message;
    }

    public setActive(active:number) {
        this.active = active;
    }

    public setMessage(message:string) {
        this.message = message;
    }
}