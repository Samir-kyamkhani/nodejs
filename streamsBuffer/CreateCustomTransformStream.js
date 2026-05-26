import fs from "fs";
import { replaceWordStream } from "./replaceWord.js";
import { pipeline } from "stream";

//String processing
const PlainFileStream = fs.createReadStream("plain.txt", "utf-8");
const writeStream = fs.createWriteStream("plain-copy.txt");

// PlainFileStream.pipe(replaceWordStream).pipe(writeStream);

pipeline(PlainFileStream, replaceWordStream, writeStream, (err) => {
  if (err) {
    console.error("Pipeline failed:", err);
  } else {
    console.log("Pipeline succeeded, file copied successfully");
  }
});

console.log(`Transform stream is processing data...`);

// writeStream.on("finish", () => {
//   console.log("File copied successfully");
// });

// PlainFileStream.on("data", (chunk) => {
//   //Process the chunk data
//   const processedChunk = chunk
//     .toString()
//     .replace(/ipsum/gi, "next")
//     .toLocaleUpperCase(); // Example processing: Remove punctuation

//   console.log(`Processed chunk data: ${processedChunk}`);

//   //Write the processed chunk data to the write stream
//   writeStream.write(processedChunk);
// });
