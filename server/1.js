const fs = require("fs");

// fs文件操作

// 异步写入文件
function wfs(path, content, method = "w") {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, { flag: method }, (err) => {
      if (!err) {
        resolve(true)
      } else {
        reject(err)
      }
    })
  })
}
// 异步读取文件
function rfs(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (!err) {
        resolve("success");
      } else {
        reject(err)
      }
    })
  })
}

// 异步删除文件
function dfs(path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (!err) {
        resolve("删除成功");
      } else {
        reject("删除失败:" + err)
      }
    })
  })
}

// wfs("./files/1.txt", "gengzhi", "w2").then((res) => {
//   console.log("写入内容:" + res)
// }).catch((err) => {
//   console.log("写入失败:" + err)
// });

// rfs("./files/1.txt").then((res) => {
//   console.log("读取内容:" + res)
// }).catch((err) => {
//   console.log("读取失败:" + err)
// });

// dfs("./files/1.txt").then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// });

// 更换文件名
// fs.rename("./files/1.txt", "./files/222.txt", (err) => {
//   if (!err) {
//     console.log("换名成功！")
//   }
// })

// 文件的
// 增  fs.writeFile
// 删  fs.unlink
// 改 fs.renameFile
// 查 fs.readFile




// ---------------------------------//


// 文件夹操作
// 增
// fs.mkdir("ctx", err => {
//   if (!err) {
//     console.log("创建成功！")
//   }
// })

// 删(空目录)
// fs.rmdir("files", err => {
//   if (!err) {
//     console.log("删除成功！")
//   }
// })

// 改
// fs.rename("gengzhi", "fff", err => {
//   if (!err) {
//     console.log("修改成功！")
//   }
// })

// 查
// fs.readdir("ctx", (err, files) => {
//   if (!err) {
//     console.log(files)
//   }
// })

// 判断文件或目录是否存在
// fs.exists("ctx/1.txt", (exists) => {
//   console.log(exists)
// })

// 获取文件或目录 详细信息
// fs.stat("ctx/1.txt", (err, stats) => {
//   if (!err) {
//     console.log(stats.isFile())
//     console.log(stats.isDirectory())
//   }
// })


// 删除文件夹（非空）
// 1.先将文件夹中的文件删除
// 2.删除空目录
// function deletefs(path) {
//   let data = fs.readdirSync(path);
//   for (let i = 0; i < data.length; i++) {
//     let stat = fs.statSync(path + "/" + data[i]);
//     if (stat.isFile()) {
//       fs.unlinkSync(path + "/" + data[i]);
//     } else {
//       deletefs(path + "/" + data[i])
//     }
//   }
//   fs.rmdirSync(path)
// }

// deletefs("111")


let buffer = Buffer.alloc(1);
console.log(buffer)