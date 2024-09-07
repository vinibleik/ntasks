import DbConnection from "../configs/db.js";

export type Task = {
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

type TaskBody = {
    user_id: number;
    title: string;
};

type TaskUpdateBody = {
    title?: string;
    done?: boolean;
};

/**
 * Strip a suffix from a string
 * @param str - The string to strip the suffix from
 * @param suffix - The suffix to strip
 * */
function stripSuffix(str: string, suffix: string): string {
    if (str.endsWith(suffix)) {
        return str.slice(0, -suffix.length);
    }
    return str;
}

function isTaskBody(obj: unknown): obj is TaskBody {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof (obj as TaskBody).user_id === "number" &&
        typeof (obj as TaskBody).title === "string"
    );
}

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

function isTaskUpdateBody(obj: unknown): obj is TaskUpdateBody {
    return (
        typeof obj === "object" &&
        obj !== null &&
        (typeof (obj as TaskUpdateBody).title === "string" ||
            typeof (obj as TaskUpdateBody).done === "boolean")
    );
}

class TaskModel {
    public connection: DbConnection;

    constructor() {
        this.connection = DbConnection.db;
    }

    /**
     * Get all tasks. If there's no tasks the array will be length 0.
     * */
    public getAll(): Task[] {
        const rows = this.connection.db.prepare("SELECT * FROM tasks").all();
        return this.parseDatabaseRows(rows);
    }

    public getAllById(id: number): Task[] {
        const rows = this.connection.db
            .prepare("SELECT * FROM tasks WHERE user_id = ?")
            .all(id);
        return this.parseDatabaseRows(rows);
    }

    /**
     * Get a task by its id. If there's no such task undefined is returned.
     * @param {number} id - The id of the task
     * @returns {Task | undefined} - The task or undefined if there's no such task
     * */
    public getById(id: number, user_id: number): Task | undefined {
        const row = this.connection.db
            .prepare("SELECT * FROM tasks WHERE id = ? AND user_id = ?")
            .get(id, user_id);
        return this.parseDatabaseRow(row);
    }

    /**
     * Create a task. If the body is invalid, return undefined
     * @param {Record<string, string>} body - The body of the task
     * @returns {Task | undefined} - The created task or undefined if the body is invalid
     * */
    public create(body: Record<string, string>): Task | undefined {
        if (!isTaskBody(body)) {
            return undefined;
        }
        const info = this.connection.db
            .prepare("INSERT INTO tasks(user_id, title) VALUES (?, ?)")
            .run(body.user_id, body.title);
        return {
            id: Number(info.lastInsertRowid),
            user_id: body.user_id,
            title: body.title,
            done: false,
        };
    }

    /**
     * Update a task. If the body is invalid, return undefined
     * @param {number} id - The id of the task
     * @param {Record<string, string>} body - The body of the task
     * @returns {Task | undefined} - The updated task or undefined if the body is invalid
     * */
    public update(
        id: number,
        user_id: number,
        body: Record<string, string>,
    ): Task | undefined {
        if (!isTaskUpdateBody(body)) {
            return undefined;
        }
        let stmt = "UPDATE tasks SET ";
        for (const col of ["title", "done"]) {
            let value = body[col];
            if (body[col] !== undefined) {
                if (col === "done") {
                    stmt += `${col} = ${value ? 1 : 0}, `;
                } else {
                    stmt += `${col} = '${value}', `;
                }
            }
        }
        stmt = stripSuffix(stmt, ", ").trimEnd();
        stmt += " WHERE id = ? AND user_id = ?";
        this.connection.db.prepare(stmt).run(id, user_id);
        return this.getById(id, user_id);
    }

    /**
     * Delete a task by its id
     * @param {number} id - The id of the task
     * */
    public delete(id: number, user_id: number): void {
        this.connection.db
            .prepare("DELETE FROM tasks WHERE id = ? AND user_id = ?")
            .run(id, user_id);
    }

    /**
     * Parse a database row to a task object. If the row is invalid, return undefined
     * @param row - The row returned from the database operation
     * */
    public parseDatabaseRow(row: unknown): Task | undefined {
        if (!isTaskRow(row)) {
            return undefined;
        }
        return {
            ...row,
            done: row.done !== 0,
        } as Task;
    }

    /**
     * Parse an array of database rows to an array of task objects
     * @param rows - The rows returned from the database operation
     * */
    public parseDatabaseRows(rows: unknown[]): Task[] {
        return rows
            .map(this.parseDatabaseRow)
            .filter((task) => task !== undefined);
    }
}

export default new TaskModel();
