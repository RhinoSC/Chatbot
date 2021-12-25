import sqlite3, {Database} from 'sqlite3';

export class DB {
    private db:Database;
    private dbPath:string = './chatbot.db';
    
    constructor(){
        this.db = new sqlite3.Database(this.dbPath, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to SQlite database.');
        }); 
        // this.createCmdTable()
        // this.createTimerTable()
    }

    public getDb(){
        return this.db;
    }

    public startDb() {
        this.db = new sqlite3.Database(this.dbPath, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to SQlite database.');
        }); 
        return;
    }

    public closeDb() {
        this.db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
        return;
    }

    private createCmdTable() {
        let sql = `CREATE TABLE IF NOT EXISTS "command" (
            "id"	INTEGER NOT NULL UNIQUE,
            "name"	TEXT NOT NULL UNIQUE,
            "alias"	TEXT,
            "permissionLvl"	TEXT NOT NULL,
            "params"	TEXT,
            "lastTime"	TEXT,
            "cooldown"	INTEGER,
            "description"	TEXT,
            "message"	TEXT,
            "custom"    INTEGER NOT NULL,
            "active"    INTEGER NOT NULL,
            PRIMARY KEY("id" AUTOINCREMENT)
        );`
    
        this.db.serialize(() => {
            this.db.run(sql, (err) => {
                if (err) {
                    console.error(err.message);
                }
            })
    
            this.insertCmdData()
        })
    }

    private createTimerTable() {
        let sql = `CREATE TABLE IF NOT EXISTS "timer" (
            "id"	INTEGER NOT NULL UNIQUE,
            "name"	TEXT NOT NULL UNIQUE,
            "call"	TEXT,
            "time"	INTEGER,
            "active"	INTEGER NOT NULL,
            "lastTime"	TEXT,
            "description"	TEXT,
            "message"	TEXT,
            PRIMARY KEY("id" AUTOINCREMENT)
        );`
    
        this.db.serialize(() => {
            this.db.run(sql, (err) => {
                if (err) {
                    console.error(err.message);
                }
            })
            this.insertTimerData()
        })
    }

    public async existsTable(table:string) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?`;
            this.db.run(sql, [table], (err) => {
                let exists = true
                if (err) {
                    exists = false
                    reject(exists)
                }
                resolve(exists)
            })
        })
    }

    public async dropTable(name:string) {
        return new Promise((resolve, reject) => {
            let sql = `DROP TABLE IF EXISTS ?`;
            this.db.run(sql, [name], (err) => {
                if (err) {
                    console.error(err.message);
                    reject(false);
                }
                console.log('Dropped table', name);
                resolve(true);
            })
        })
    }

    public insertCmdData() {
        const { defCommands, customCommands } = require('./insert-data.js');
        this.db.serialize(() => {
            defCommands.forEach((command: { name: string; alias: { toString: () => string; }; permissionLvl: string; params: string; lastTime: string; cooldown: number; description: string; message: string; custom: number; active: number; }) => {
                let sql = `INSERT INTO command 
                    (name, alias, permissionLvl, params, lastTime, cooldown, description, message, custom, active) VALUES 
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
                this.db.run(sql, [command.name, command.alias.toString(), command.permissionLvl, command.params, command.lastTime, command.cooldown, command.description, command.message, command.custom, command.active], (err) => {
                    if (err) {
                        console.error(err.message);
                    }
                    console.log('Comando creada');
                })
            })
            customCommands.forEach((command: { name: string; alias: { toString: () => string; }; permissionLvl: string; params: string; lastTime: string; cooldown: number; description: string; message: string; custom: number; active: number; }) => {
                let sql = `INSERT INTO command 
                    (name, alias, permissionLvl, params, lastTime, cooldown, description, message, custom, active) VALUES 
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
                this.db.run(sql, [command.name, command.alias.toString(), command.permissionLvl, command.params, command.lastTime, command.cooldown, command.description, command.message, command.custom, command.active], (err) => {
                    if (err) {
                        console.error(err.message);
                    }
                    console.log('Comando creada');
                })
            })
        })
    }

    public insertTimerData() {
        const { timers } = require('./insert-data.js');
        this.db.serialize(() => {
            timers.forEach((timer: { name: string; call: string; time: number; active: number; lastTime: string; description: string; message: string; }) => {
                let sql = `INSERT INTO timer 
                    (name, call, time, active, lastTime, description, message) VALUES 
                    (?,?,?,?,?,?,?)`
                this.db.run(sql, [timer.name, timer.call, timer.time, timer.active, timer.lastTime, timer.description, timer.message], (err) => {
                    if (err) {
                        console.error(err.message);
                    }
                    console.log('Fila creada');
                })
            })
        })
    }
}


