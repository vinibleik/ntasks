import DbConnection from "../configs/db.js";

type User = {
    id: number;
    name: string;
    password: string;
    email: string;
};

function isUser(obj: unknown): obj is User {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof (obj as User).id === "number" &&
        typeof (obj as User).name === "string" &&
        typeof (obj as User).password === "string" &&
        typeof (obj as User).email === "string"
    );
}

class UserModel {
    private connection;

    constructor() {
        this.connection = DbConnection.db;
    }

    public getById(id: number): User | undefined {
        const row = this.connection.db
            .prepare("SELECT * FROM users WHERE id = ?")
            .get(id);
        return isUser(row) ? row : undefined;
    }

    public getAll(): User[] {
        const rows = this.connection.db.prepare("SELECT * FROM users").all();
        return rows.filter(isUser);
    }
}

export default new UserModel();
