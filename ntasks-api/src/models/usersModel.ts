import DbConnection from "../configs/db.js";

type UserBody = {
    name: string;
    password: string;
    email: string;
};

type User = UserBody & {
    id: number;
};

function isUserBody(obj: unknown): obj is UserBody {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof (obj as UserBody).name === "string" &&
        typeof (obj as UserBody).password === "string" &&
        typeof (obj as UserBody).email === "string"
    );
}

function isUser(obj: unknown): obj is User {
    return isUserBody(obj) && typeof (obj as User).id === "number";
}

class UserModel {
    private connection;

    constructor() {
        this.connection = DbConnection.db;
    }

    /**
     * Get user by id
     * @param id - The id of the user
     * @returns The user with the given id, or undefined if not found
     * */
    public getById(id: number): User | undefined {
        const row = this.connection.db
            .prepare("SELECT id, name, email  FROM users WHERE id = ?")
            .get(id);
        return isUser(row) ? row : undefined;
    }

    /**
     * Create a new user
     * @param user - The user to create
     * @returns The created user, or undefined if the user is invalid
     * */
    public create(user: Record<string, string>): User | undefined {
        if (!isUserBody(user)) {
            return undefined;
        }

        const info = this.connection.db
            .prepare(
                "INSERT INTO users(name, password, email) VALUES (?, ?, ?)",
            )
            .run(user.name, user.password, user.email);
        return this.getById(Number(info.lastInsertRowid));
    }

    /**
     * Delete a user by id
     * @param id - The id of the user to delete
     * */
    public delete(id: number): void {
        this.connection.db.prepare("DELETE FROM users WHERE id = ?").run(id);
    }
}

export default new UserModel();
