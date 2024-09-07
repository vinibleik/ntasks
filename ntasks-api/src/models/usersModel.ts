import DbConnection from "../configs/db.js";
import bcrypt from "bcrypt";

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

class UserModel {
    public connection: DbConnection;

    constructor() {
        this.connection = DbConnection.db;
    }

    public checkPassword(user: User, password: string): boolean {
        return bcrypt.compareSync(password, user.password);
    }

    /**
     * Get user by id
     * @param id - The id of the user
     * @returns The user with the given id, or undefined if not found
     * */
    public getById(id: number): User | undefined {
        const row = this.connection.db
            .prepare("SELECT id, name, email FROM users WHERE id = ?")
            .get(id);
        return row as User | undefined;
    }

    public getByEmail(email: string): User | undefined {
        const row = this.connection.db
            .prepare(
                "SELECT id, name, email, password FROM users WHERE email = ?",
            )
            .get(email);
        return row as User | undefined;
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

        const password = bcrypt.hashSync(user.password, 12);

        const info = this.connection.db
            .prepare(
                "INSERT INTO users(name, password, email) VALUES (?, ?, ?)",
            )
            .run(user.name, password, user.email);
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
