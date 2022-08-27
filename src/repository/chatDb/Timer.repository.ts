import { Database } from "sqlite3";
import { Timer } from "../../models/Timer";


export class TimerRepository {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }


    public createTimer(cmd: { name: string; call: string; time: number; active: number; lastTime: string; description: string; message: string; }) {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO timer 
                        (name, call, time, active, lastTime, description, message) VALUES 
                        (?, ?, ?, ?, ?, ?, ?)`
            this.db.run(sql, [cmd.name, cmd.call, cmd.time, cmd.active, cmd.lastTime, cmd.description, cmd.message], (err: { message: string; }) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                resolve(true);
            })
        })
    }

    public updateTimer(id:number, cmd: { name: string; call: string; time: number; active: number; lastTime: string; description: string; message: string; }) {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE timer SET 
                                name = ?, 
                                call = ?, 
                                time = ?, 
                                active = ?, 
                                lastTime = ?, 
                                description = ?, 
                                message = ?
                                WHERE id = ?`;
    
            this.db.run(sql, [
                cmd.name, cmd.call, cmd.time,
                cmd.active, cmd.lastTime, cmd.description,
                cmd.message, id
            ], (err: { message: string; }) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                resolve(true)
            })
        })
    }

    public deleteTimer(id:number) {
        return new Promise((resolve, reject) => {
            let sql = `DELETE FROM timer WHERE id = ?`;
            this.db.run(sql, [id], (err:{message: string}) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                resolve(true);
            })
        })
    }

    public getTimers():Promise<Timer[]> {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM timer', (err: { message: string; }, row: Timer[]) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                // console.log(row);
                resolve(row);
            })
        })
    }

    getTimerById(id:number):Promise<Timer> {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM timer WHERE id = ?';
            this.db.get(sql, [id], (err: { message: string; }, row: Timer) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                resolve(row);
            })
        })
    }

    getTimerByName(name:string):Promise<Timer> {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM timer WHERE name = ?';
            this.db.get(sql, [name], (err: { message: string; }, row: Timer) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                resolve(row);
            })
        })
    }
}