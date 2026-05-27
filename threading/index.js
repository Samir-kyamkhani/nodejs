import { normalThreding } from "./normal-threading/main.js";
import { multithreadingMain } from "./multi-threading/main.js";
import { multithreadingWorkerPoolMain } from "./multi-threading-worker-pool/main.js";
import os from "node:os";

async function main() {
  console.log(`Total Cpu count: ${os.cpus().length}`);

  // console.log("Normal threading Statr here..");

  await normalThreding();
  // Total Time: 36285ms (36.28s)
  // Avrege image Time: 3628.5ms

  // console.log("Multi-threading Statr here..");

  await multithreadingMain();
  // Total Time: 37ms (0.04s)
  // Avrege image Time: 3.7ms

  // console.log("Multi-threading Worker Pool Statr here..");

  await multithreadingWorkerPoolMain();
  // Total Time: 13744ms (13.74s)
  // Average image Time: 1374ms
}

main();
