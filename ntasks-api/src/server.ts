import App from "./app.js";
import config from "./configs/config.js";
import fs from "node:fs";
import path from "node:path";
import https from "node:https";

const PORT = config.PORT;
const CERT_DIR = path.resolve(path.join(__dirname, "../certificates/"));

if (config.NODE_ENV !== "test") {
    const options = {
        key: fs.readFileSync(path.join(CERT_DIR, "ntask.key"), "utf8"),
        cert: fs.readFileSync(path.join(CERT_DIR, "ntask.crt"), "utf8"),
    };
    https.createServer(options, App).listen(PORT, () => {
        console.log(`Ntasks API - PORT ${PORT}`);
    });
}
