import path from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";
import { runWorker } from "./runWorker.js";
import { readdir } from "node:fs/promises";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const INPUT_DIR = path.join(__dirname, "../input-images");
const WORKER_FILE_PATH = path.join(__dirname, "./multithreadingWorker.js");

export async function multithreadingMain() {
  const files = await readdir(INPUT_DIR);

  const imageFiles = files.filter((file) =>
    /\.(jpg|jpeg|png|webp)$/i.test(file),
  );

  const startTime = Date.now();

  //This is problmetic = file is eqal to worker this not good if 100 file have then we need 100 core in cpu
  //solutin is Worker pool
  const imagePromises = imageFiles.map(async (file) => {
    const filePath = path.join(INPUT_DIR, file);
    const data = await runWorker({ filePath, file });
    return data;
  });

  const result = await Promise.all(imageFiles);

  const totalTime = Date.now() - startTime;

  console.log("=".repeat(30));
  console.log(
    `Total Time: ${totalTime}ms (${(totalTime / 1000).toFixed(2)}s) `,
  );
  console.log(
    `Avrege image Time: ${totalTime / imageFiles.length.toFixed(0)}ms`,
  );
  console.log("=".repeat(30));
}
