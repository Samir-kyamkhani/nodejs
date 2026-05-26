import { Transform } from "stream";

export const replaceWordStream = new Transform({
  transform(chunk, encoding, callback) {
    // replaceWordStream.emit("error", new Error("An error occurred during transformation"));

    const transformedChunk = chunk
      .toString()
      .replace(/ipsum/gi, "next")
      .toLocaleUpperCase();

    callback(null, transformedChunk);
  },
});
