import console from "console";
import { Readable } from "stream";

const readableStream = new Readable({
  objectMode: true, // Enable object mode to allow pushing objects
  highWaterMark: 16, // set the nomber of objects to buffer before pausing the stream
  read() {
    // No need to implement anything here, we will push data manually
  },
});

readableStream.on("data", (chunk) => {
  console.log(`Chunks data`, chunk);
});

const hello = {
  a: "Hello",
  b: "World",
};

console.log(readableStream.push(hello));
