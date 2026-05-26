import { Readable } from "stream";

const readableStream = new Readable({
  highWaterMark: 16, // Set the buffer size to 16 bytes
  read() {
    // No need to implement anything here, we will push data manually
  },
});

readableStream.on("data", (chunk) => {
  console.log(`Chunks data`, chunk.toString());
});

const hello = "Hello";

for (let i = 0; i < hello.length; i++) {
  console.log(
    readableStream.push(
      `Chunk ${hello[i]} size: ${Buffer.byteLength(`Chunk ${hello[i]}`)} bytes`,
    ),
  );
}
