import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parentPort, workerData } from "node:worker_threads";
import sharp from "sharp";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const OUTPUT_DIR = path.join(__dirname, "../public/multithreading-output");

async function processImages() {
  const { filePath, fileName } = workerData;

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
          .toFile(
            path.join(
              outputSubDirectorPath,
              `thumbnail.${fileName.split(".")[1]}`,
            ),
          );
      },
    },
    {
      name: "small",
      operation: async () => {
        await image
          .clone()
          .resize(300, 300)
          .toFile(
            path.join(outputSubDirectorPath, `small.${fileName.split(".")[1]}`),
          );
      },
    },
    {
      name: "mediam",
      operation: async () => {
        await image
          .clone()
          .resize(600, 600)
          .toFile(
            path.join(
              outputSubDirectorPath,
              `mediam.${fileName.split(".")[1]}`,
            ),
          );
      },
    },
    {
      name: "large",
      operation: async () => {
        await image
          .clone()
          .resize(1200, 1200)
          .toFile(
            path.join(outputSubDirectorPath, `large.${fileName.split(".")[1]}`),
          );
      },
    },
    {
      name: "grayscal",
      operation: async () => {
        await image
          .clone()
          .grayscale()
          .toFile(
            path.join(
              outputSubDirectorPath,
              `grayscal.${fileName.split(".")[1]}`,
            ),
          );
      },
    },
    {
      name: "blur",
      operation: async () => {
        await image
          .clone()
          .blur(10)
          .toFile(
            path.join(outputSubDirectorPath, `blur.${fileName.split(".")[1]}`),
          );
      },
    },
  ];

  for (const taks of tasks) {
    await taks.operation();
  }

  parentPort.postMessage(
    `${fileName}: Image Processed sucessfully with multi threading`,
  );
}

processImages();
