import sqlite3, { Database } from 'sqlite3';

let tables = {
    commands: `CREATE TABLE IF NOT EXISTS "command" (
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
    );`,

    timer: `CREATE TABLE IF NOT EXISTS "timer" (
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
}

function insertCmdData(db: sqlite3.Database) {
    const { defCommands, customCommands } = require('../insert-data');
    db.serialize(() => {
        defCommands.forEach((command: { name: string; alias: { toString: () => string; }; permissionLvl: string; params: string; lastTime: string; cooldown: number; description: string; message: string; custom: number; active: number; }) => {
            let sql = `INSERT INTO command 
                (name, alias, permissionLvl, params, lastTime, cooldown, description, message, custom, active) VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            db.run(sql, [command.name, command.alias.toString(), command.permissionLvl, command.params, command.lastTime, command.cooldown, command.description, command.message, command.custom, command.active], (err) => {
                if (err) {
                    console.error(err.message);
                }
                console.log('[chatDB] command created');
            })
        })
        customCommands.forEach((command: { name: string; alias: { toString: () => string; }; permissionLvl: string; params: string; lastTime: string; cooldown: number; description: string; message: string; custom: number; active: number; }) => {
            let sql = `INSERT INTO command 
                (name, alias, permissionLvl, params, lastTime, cooldown, description, message, custom, active) VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            db.run(sql, [command.name, command.alias.toString(), command.permissionLvl, command.params, command.lastTime, command.cooldown, command.description, command.message, command.custom, command.active], (err) => {
                if (err) {
                    console.error(err.message);
                }
                console.log('[chatDB] command created');
            })
        })
    })
}

function insertTimerData(db: sqlite3.Database) {
    const { timers } = require('../insert-data');
    db.serialize(() => {
        timers.forEach((timer: { name: string; call: string; time: number; active: number; lastTime: string; description: string; message: string; }) => {
            let sql = `INSERT INTO timer 
                (name, call, time, active, lastTime, description, message) VALUES 
                (?,?,?,?,?,?,?)`
            db.run(sql, [timer.name, timer.call, timer.time, timer.active, timer.lastTime, timer.description, timer.message], (err) => {
                if (err) {
                    console.error(err.message);
                }
                console.log('[chatDB] timer created');
            })
        })
    })
}

export default { tables, insertCmdData, insertTimerData }