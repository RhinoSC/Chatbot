import sqlite3, { Database } from 'sqlite3';
// import sqlTables from './tables'

export class DB {
    private db: Database;
    private dbPath: string;

    constructor(dbPath: string) {
        this.dbPath = dbPath
        this.db = new sqlite3.Database(this.dbPath, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to SQlite database.');

            // this.existsTable('command').then((exists: boolean | any) => {
            //     this.createCmdTable(exists)
            // }).catch(err => {
            //     this.createCmdTable(true)
            // })

            // this.existsTable('timer').then((exists: boolean | any) => {
            //     this.createTimerTable(exists)
            // }).catch(err => {
            //     this.createTimerTable(true)
            // })
        });
    }

    public getDb() {
        return this.db;
    }

    public async startDb() {
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

    private createCmdTable(exists: boolean) {
        // let sql = sqlTables.tables.commands

        // this.db.serialize(() => {
        //     this.db.run(sql, (err) => {
        //         if (err) {
        //             console.error(err.message);
        //         }
        //     })
        //     if (!exists)
        //         sqlTables.insertCmdData(this.db)
        // })
    }

    public async existsTable(table: string) {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?`, table, (err, row) => {
                if (err) reject(err)
                row ? resolve(true) : resolve(false)
            })
        })
    }

    public async dropTable(name: string) {
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

}


