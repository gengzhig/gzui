console.time("worker2时间")
let a = 0;
for (let i = 0; i < 160000000; i++) {
  a += i;
}
console.timeEnd("worker2时间")
postMessage(a);