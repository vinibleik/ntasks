import fs from "node:fs";
import path from "node:path";
import winston from "winston";

const LOGS_PATH = path.resolve(path.join(__dirname, "../../logs"));

if (!fs.existsSync(LOGS_PATH)) {
    fs.mkdirSync(LOGS_PATH);
}

export default winston.createLogger({
    transports: [
        new winston.transports.File({
            level: "info",
            filename: path.join(LOGS_PATH, "app.log"),
            maxsize: 1048576,
            maxFiles: 10,
        }),
    ],
});
