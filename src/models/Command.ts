export class Command {
    public id: number;
    public name: string;
    public alias: string;
    public permissionLvl: string;
    public params: string;
    public lastTime: string;
    public cooldown: number;
    public description: string;
    public message: string;
    public custom: number;
    public active: number;

    constructor(id: number, name: string, alias: string, permissionLvl: string, params: string, lastTime: string = new Date().toISOString(), cooldown: number, description: string, message: string, custom: number, active: number) {
        this.id = id;
        this.name = name;
        this.alias = alias;
        this.permissionLvl = permissionLvl;
        this.params = params;
        this.lastTime = lastTime;
        this.cooldown = cooldown;
        this.description = description;
        this.message = message;
        this.custom = custom;
        this.active = active;
    }
}