const { Worker } = require("worker_threads");

const start = () => {
  let totalSum = 0;

  for (let i = 0; i < 90; i++) {
    const worker = new Worker("./worker.js");
    worker.postMessage(1000000000);
    worker.on("message", (result) => {
      totalSum += result;
      console.log(`나는 ${i}번째 일꾼이고, 현재까지 총 합은 ${totalSum}이다!`);
    });
  }
};

start();
