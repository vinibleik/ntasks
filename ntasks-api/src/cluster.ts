import cluster from "node:cluster";
import os from "node:os";

const CPUS = os.cpus();
if (cluster.isPrimary) {
    CPUS.forEach(() => cluster.fork());
    cluster.on("listening", (worker) => {
        console.log("Cluster %d connected", worker.process.pid);
    });
    cluster.on("disconnect", (worker) => {
        console.log(`Cluster ${worker.process.pid} disconnected`);
    });
    cluster.on("exit", (worker) => {
        console.log(`Cluster ${worker.process.pid} is dead`);
        cluster.fork();
    });
} else {
    require("./server.js");
}
