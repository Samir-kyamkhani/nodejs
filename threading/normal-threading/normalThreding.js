import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const OUTPUT_DIR = path.join(__dirname, "../public/noraml-output");

export async function processImages(filePath, fileName) {
  const outputSubDirectorPath = path.join(OUTPUT_DIR, fileName.split(".")[0]);

  await mkdir(outputSubDirectorPath, { recursive: true });

  const image = sharp(filePath);

  const tasks = [
    {
      name: "thumbnail",
      operation: async () => {
        await image
          .clone()
          .resize(150, 150)
          .toFile(path.join(outputSubDirectorPath, "thumbnail.jpg"));
      },
    },
    {
      name: "small",
      operation: async () => {
        await image
          .clone()
          .resize(300, 300)
          .toFile(path.join(outputSubDirectorPath, "small.jpg"));
      },
    },
    {
      name: "mediam",
      operation: async () => {
        await image
          .clone()
          .resize(600, 600)
          .toFile(path.join(outputSubDirectorPath, "mediam.jpg"));
      },
    },
    {
      name: "large",
      operation: async () => {
        await image
          .clone()
          .resize(1200, 1200)
          .toFile(path.join(outputSubDirectorPath, "large.jpg"));
      },
    },
    {
      name: "grayscal",
      operation: async () => {
        await image
          .clone()
          .grayscale()
          .toFile(path.join(outputSubDirectorPath, "grayscal.jpg"));
      },
    },
    {
      name: "blur",
      operation: async () => {
        await image
          .clone()
          .blur(10)
          .toFile(path.join(outputSubDirectorPath, "blur.jpg"));
      },
    },
  ];

  for (const task of tasks) {
    await task.operation();
  }
}
