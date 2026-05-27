import { availableParallelism } from "node:os";
import clustor from "node:cluster";
import express from "express";
import { loop } from "./loop.js";

const numCpu = availableParallelism();

if (clustor.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCpu / 2; i++) {
    clustor.fork();
  }

  clustor.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} is died.`);
  });
} else {
  const app = express();
  app.get("/", loop);
  app.listen(5000, () => console.log("Server running on port 5000"));
}
