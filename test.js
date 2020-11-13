const start = process.hrtime.bigint();

setTimeout(() => {
  const end = process.hrtime.bigint();
  const exec = end - start;
  console.log(parseInt((exec / 10000000n).toString()) / 100);
}, 1000);
