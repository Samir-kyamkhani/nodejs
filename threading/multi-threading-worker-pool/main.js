import path from "node:path";
import { fileURLToPath } from "node:url";
import { readdir } from "node:fs/promises";
import { createPool } from "./workerPool.js";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const INPUT_DIR = path.join(__dirname, "../input-images");

const WORKER_FILE_PATH = path.join(__dirname, "./multithreadingWorker.js");

export async function multithreadingWorkerPoolMain() {
  const files = await readdir(INPUT_DIR);

  const imageFiles = files.filter((file) =>
    /\.(jpg|jpeg|png|webp)$/i.test(file),
  );

  const startTime = Date.now();

  const { runTask } = createPool(WORKER_FILE_PATH);

  const imagePromises = imageFiles.map(async (file) => {
    const filePath = path.join(INPUT_DIR, file);

    const result = await runTask({
      filePath,
      fileName: file,
    });

    return result;
  });

  await Promise.all(imagePromises);

  const totalTime = Date.now() - startTime;

  console.log("=".repeat(30));

  console.log(`Total Time: ${totalTime}ms (${(totalTime / 1000).toFixed(2)}s)`);

  console.log(
    `Average image Time: ${(totalTime / imageFiles.length).toFixed(0)}ms`,
  );

  console.log("=".repeat(30));
}
