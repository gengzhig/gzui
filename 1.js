console.time("worker1时间")
let a = 0;
for (let i = 0; i < 160000000; i++) {
  a += i;
}
console.timeEnd("worker1时间")
postMessage(a);





// const loadJs = (src) => {
//   return new Promise((resolve, reject) => {
//     let script = document.createElement("script");
//     script.src = src;
//     script.onload = resolve;
//     script.onerror = reject;
//     document.head.appendChild(script);
//   })
// }