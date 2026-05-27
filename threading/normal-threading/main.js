import { fileURLToPath } from "node:url";
import path from "node:path";
import { processImages } from "./normalThreding.js";
import { readdir } from "node:fs/promises";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const INPUT_DIR = path.join(__dirname, "../input-images");

export async function normalThreding() {
  const files = await readdir(INPUT_DIR);

  const imageFiles = files.filter((file) =>
    /\.(jpg|jpeg|png|webp)$/i.test(file),
  );

  const startTime = Date.now();

  for (const file of imageFiles) {
    const filePath = path.join(INPUT_DIR, file);
    await processImages(filePath, file);
  }

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
