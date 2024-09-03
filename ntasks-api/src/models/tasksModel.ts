import DbConnection from "../configs/db.js";

type Task = {
    id: number;
    user_id: number;
    title: string;
    done: boolean;
};

type TaskRow = {
    id: number;
    user_id: number;
    title: string;
    done: number;
};

function isTaskRow(obj: unknown): obj is TaskRow {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof (obj as TaskRow).id === "number" &&
        typeof (obj as TaskRow).user_id === "number" &&
        typeof (obj as TaskRow).title === "string" &&
        typeof (obj as TaskRow).done === "number"
    );
}

class TaskModel {
    private connection;

    constructor() {
        this.connection = DbConnection.db;
    }

    public getAll(): Task[] {
        const rows = this.connection.db.prepare("SELECT * FROM tasks").all();
        return this.parseDatabaseRows(rows);
    }

    public getById(id: number): Task | undefined {
        const row = this.connection.db
            .prepare("SELECT * FROM tasks WHERE id = ?")
            .get(id);
        return this.parseDatabaseRow(row);
    }

    public parseDatabaseRow(row: unknown): Task | undefined {
        if (!isTaskRow(row)) {
            return undefined;
        }
        return {
            ...row,
            done: row.done !== 0,
        } as Task;
    }

    public parseDatabaseRows(rows: unknown[]): Task[] {
        return rows
            .map(this.parseDatabaseRow)
            .filter((task) => task !== undefined);
    }
}

export default new TaskModel();
