import http from "http";
import fs from "fs";

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url !== "/") {
    return res.end("Not Found");
  }

  // bad way to download big file
  // const file = fs.readFileSync("plain.txt");
  // return res.end(file);

  //Best way to download big file
  // const readStream = fs.createReadStream("plain.txt");
  // readStream.pipe(res);

  //Bad way to download big video file
  // const readStream = fs.readFileSync("big.mp4");
  // res.writeHead(200, { "content-type": "video/mp4" });
  // res.end(readStream);

  //Best way to download big video file
  // const readStream = fs.createReadStream("big.mp4");
  // res.writeHead(200, { "content-type": "video/mp4" });
  // readStream.pipe(res);

  //Bad way to Copy big file
  // const file = fs.readFileSync("plain.txt");
  // fs.writeFileSync("plain-copy.txt", file);
  // res.end("File copied successfully");

  //Best way to Copy big file
  // const readStream = fs.createReadStream("plain.txt");
  // const writeStream = fs.createWriteStream("plain-copy.txt");

  // readStream.on("data", (chunk) => {
  //   console.log(`Chunks data`, chunk.toString());

  //   writeStream.write(chunk);
  // });

  // readStream.pipe(writeStream);
  // writeStream.on("finish", () => {
  //   res.end("File copied successfully");
  // });

  //String processing

  const PlainFileStream = fs.createReadStream("plain.txt", "utf-8");
  const writeStream = fs.createWriteStream("plain-copy.txt");
  PlainFileStream.on("data", (chunk) => {
    //Process the chunk data
    const processedChunk = chunk
      .toString()
      .replace(/ipsum/gi, "next")
      .toLocaleUpperCase(); // Example processing: Remove punctuation

    console.log(`Processed chunk data: ${processedChunk}`);

    //Write the processed chunk data to the write stream
    writeStream.write(processedChunk);
  });

  writeStream.on("finish", () => {
    res.end("File copied successfully");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
