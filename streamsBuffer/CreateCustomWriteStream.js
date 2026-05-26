import { Writable } from "stream";

const writeableStream = new Writable({
  highWaterMark: 16, // Set the buffer size to 16 bytes
  write(chunk, encoding, callback) {
    console.log(`Chunk received: ${chunk.toString()}`);
    callback();
  },
});

writeableStream.on("finish", () => {
  console.log("Finished writing data");
});

const hello = "Hello";

for (let i = 0; i < hello.length; i++) {
  console.log(
    writeableStream.write(
      `Chunk ${hello[i]} size: ${Buffer.byteLength(`Chunk ${hello[i]}`)} bytes`,
    ),
  );
}
