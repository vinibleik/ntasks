import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
dotenv.config({
    path: path.resolve(
        __dirname,
        `../../environments/.${process.env.NODE_ENV || "development"}.env`,
    ),
});

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all
interface ENV {
    NODE_ENV: "development" | "production" | "test" | undefined;
    PORT: number | undefined;
    JWT_SECRET: string | undefined;
    DB_NAME: string | undefined;
}

interface Config {
    NODE_ENV: string;
    PORT: number;
    JWT_SECRET: string;
    DB_NAME: string;
}

// Loading process.env as ENV interface
const getConfig = (): ENV => {
    return {
        NODE_ENV: process.env.NODE_ENV || "development",
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
        JWT_SECRET: process.env.JWT_SECRET,
        DB_NAME: process.env.DB_NAME,
    };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
