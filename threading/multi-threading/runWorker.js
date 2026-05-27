import path from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const WORKER_FILE_PATH = path.join(__dirname, "./multithreadingWorker.js");

export function runWorker(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(WORKER_FILE_PATH, {
      workerData: {
        filePath: data.filePath,
        fileName: data.file,
      },
    });

    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0) reject(new Error("Worker stoped with exit code ", code));
    });
  });
}
