import fs from "fs";

const writeStream = fs.createWriteStream("output.txt");
console.log("Enter text to write to output.txt (press Ctrl+C to exit):");

process.stdin.pipe(writeStream);

const readStream = fs.createReadStream("output.txt");
readStream.pipe(process.stdout);
