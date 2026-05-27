import { Worker } from "node:worker_threads";
import os from "node:os";

export function createPool(workerFilePath) {
  const workerPool = [];
  const idleWorkers = [];
  let taskQueue = [];

  let taskId = 0;
  const cpuCount = os.cpus().length;
  const halfCpuCount = cpuCount / 2;

  for (let i = 0; i < halfCpuCount; i++) {
    const worker = new Worker(workerFilePath);
    workerPool.push(worker);
    idleWorkers.push(worker);
  }

  function runTask(data) {
    return new Promise((resolve, reject) => {
      taskQueue.push({
        data: { taskId: ++taskId, ...data },
        resolve,
        reject,
      });

      runNext();
    });
  }

  function runNext() {
    if (idleWorkers.length === 0 || taskQueue.length === 0) return;

    const worker = idleWorkers.pop();
    const task = taskQueue.shift();

    const activeWorkers = workerPool.length - idleWorkers.length;

    console.log(`Running: ${activeWorkers}, Queue: ${taskQueue.length}`);

    worker.once("message", (msg) => {
      if (!msg.success) {
        task.reject(new Error(msg.error));
      } else {
        task.resolve(msg);
      }

      idleWorkers.push(worker);

      runNext();
    });

    worker.postMessage(task.data);
  }

  return { runTask };
}
