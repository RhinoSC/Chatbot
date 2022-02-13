import axios, {AxiosInstance, AxiosResponse} from 'axios';

export class horaroAPI{
    private baseURL:string = 'https://horaro.org/-/api/v1/schedules/';
    private scheduleJson:string = `${process.env.SCHEDULE_JSON}`;
    private API:AxiosInstance;
    public counter:number = 0;
    public max:number = -1;
    public active:boolean = false;
    public columns:string[] = ['Juego', 'Runner/s', 'Categoría', 'Plataforma', 'Comentaristas', 'hiddenGame', 'hiddenRunner', 'hiddenComs'];

    constructor(){
        this.API = axios.create({
            baseURL: this.baseURL
        })
    }

    public async getColumns() {
        let response = await this.API.get(this.scheduleJson)
        if (!response.data) return;
        return response.data.data.columns;
    }

    public async getRows() {
        let response = await this.API.get(this.scheduleJson)
        if (!response.data) return;
        return response.data.data.items;
    }

    public async getColumnByName(name:string) {
        let response = await this.API.get(this.scheduleJson)
        if (!response.data) return;
        return response.data.data.columns.findIndex((column: string) => column == name);
    }

    public async getColumnById(id:number) {
        let response = await this.API.get(this.scheduleJson)
        if (!response.data) return;
        return response.data.data.columns[id];
    }

    public async getRowByName(name:string) {
        let response = await this.API.get(this.scheduleJson)
        if (!response.data) return;
        let column = await this.getColumnByName('Juego');
        let indexs:number[] = []
        let rows = response.data.data.items.filter((item: { data: { [x: string]: string; }; }, index:number) => {
            if (item.data[column] == name) {
                indexs.push(index)
            }
            return item.data[column] == name;
        })
        return { rows, indexs };
    }

    public async getRowById(id:number) {
        let response = await this.API.get(this.scheduleJson)
        if (!response.data) return;
        return response.data.data.items[id];
    }

    public async getActive() {
        return this.active;
    }

    public getMax() {
        return this.max;
    }

    public getCounter() {
        return this.counter-1;
    }

    public setCounter(value:number) {
        let done = false;
        if (value > -1 && value < this.max) {
            this.counter = value;
            done = true
        }
        return done;
    }

    public setMax(value:number) {
        this.max = value;
        return true;
    }

    public start(max:number) {
        this.setCounter(0);
        this.setMax(max);
        this.active = true;
        return true;
    }

    public reset() {
        this.setCounter(0);
        this.setMax(-1);
        this.active = false;
        return true;
    }

    public formatString(text:string, decorateTwitch:boolean = false) {
        if (!text) {
            text = '.';
        }
        let count = text.match(/\[+([a-zA-ZÀ-ÿ])+\]+/g);
        if (count) {
            text = text.substring(Math.floor(count.length / 2), text.search(']'));
        }
    
        count = text.match(/\*+([a-zA-ZÀ-ÿ])+\*+/g);
        if (count) {
            text = text.substring(Math.floor(count.length / 2), text.length - Math.floor(count.length / 2));
        }
    
        if (decorateTwitch) {
            let arr = text.split(', ')
            for (let i = 0; i < arr.length; i++) {
                if (!arr[i].startsWith('$')) {
                    arr[i] = 'twitch.tv/' + arr[i].trim();
                } else {
                    arr[i] = arr[i].substring(1, arr[i].length).trim();
                }
            }
            text = arr.join(' , ');
        }
    
        return text;
    }
}