import { SqliteError } from "better-sqlite3";

export function handleError(e: unknown) {
    console.error(e);
    let message = "Error";
    let code = "9999";

    if (e instanceof SqliteError) {
        message = e.message;
        code = e.code;
    } else if (e instanceof Error) {
        message = e.message;
    }

    return {
        error: "Internal Server Error",
        message,
        code,
    };
}
