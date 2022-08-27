import { Database } from "sqlite3";
import { Command } from "../../models/Command";

export class CommandRepository {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    public createCommand(cmd: { name: string; alias: { toString: () => string; }; permissionLvl: string; params: string; lastTime: string; cooldown: number; description: string; message: string; custom: number; active: number; }) {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO command 
                        (name, alias, permissionLvl, params, lastTime, cooldown, description, message, custom, active) VALUES 
                        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            this.db.run(sql, [cmd.name, cmd.alias.toString(), cmd.permissionLvl, cmd.params, cmd.lastTime, cmd.cooldown, cmd.description, cmd.message, cmd.custom, cmd.active], (err) => {
                if (err) {
                    console.error(err.message);
                    reject(err.message);
                }
                resolve('Creado');
                // console.log('Fila creada');
            })
        })
    }

    public updateCommand(id: number, cmd: { name: string; alias: { toString: () => string; }; permissionLvl: string; params: string; lastTime: string; cooldown: number; description: string; message: string; custom: number; active: number; }) {
        // console.log(cmd.message);s
        return new Promise((resolve, reject) => {
            let sql = `UPDATE command SET 
                                name = ?, 
                                alias = ?, 
                                permissionLvl = ?, 
                                params = ?, 
                                lastTime = ?, 
                                cooldown = ?, 
                                description = ?, 
                                message = ?,
                                custom = ?,
                                active = ?
                                WHERE id = ?`;

            this.db.run(sql, [
                cmd.name, cmd.alias.toString(), cmd.permissionLvl,
                cmd.params, cmd.lastTime,
                cmd.cooldown, cmd.description,
                cmd.message, cmd.custom, cmd.active, id
            ], (err) => {
                if (err) {
                    console.error(err.message);
                    reject(err.message);
                }
                resolve('Actualizado');
            })
        })
    }

    public deleteCommand(id:number) {
        return new Promise((resolve, reject) => {
            let sql = `DELETE FROM command WHERE id = ?`;
            this.db.run(sql, [id], (err) => {
                if (err) {
                    console.error(err.message);
                    reject(err.message);
                }
                resolve('Borrado');
            })
        })
    }

    public getCommands():Promise<Command[]> {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM command', (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err)
                }
                // console.log(row);
                resolve(row)
            })
        })
    }

    public getCommandById(id:number):Promise<Command> {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM command WHERE id = ?';
            this.db.get(sql, [id], (err: { message: string; }, row: Command) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                console.log(row);
                resolve(row);
            })
        })
    }

    public getCommandByName(name:string) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM command WHERE name = ?';
            this.db.get(sql, [name], (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                resolve(row);
            })
        })
    }
}