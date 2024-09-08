declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production" | "test";
            PORT: string;
            JWT_SECRET: string;
            DB_NAME: string;
        }
    }
}

export {};
