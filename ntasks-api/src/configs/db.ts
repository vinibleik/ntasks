import { join, resolve } from "node:path";
import { readFileSync } from "node:fs";
import Database from "better-sqlite3";

const DB_PATH: string = resolve(__dirname, "../../db");

class SqliteConnection {
    static #instance: SqliteConnection;
    public db: Database.Database;

    private constructor() {
        const db = new Database(join(DB_PATH, "quotes.db"));
        db.pragma("foreign_keys = ON");
        db.pragma("journal_mode = WAL");
        const migration = readFileSync(join(DB_PATH, "db.sql"), "utf8");
        db.exec(migration);
        this.db = db;
    }

    public static get db(): SqliteConnection {
        if (!SqliteConnection.#instance) {
            SqliteConnection.#instance = new SqliteConnection();
        }

        return SqliteConnection.#instance;
    }
}

export default SqliteConnection;
