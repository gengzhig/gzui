export default {
  mounted(el) {
    el.addEventListener("click", function () {
      let code = document.querySelector(".highlight.code textarea");
      code.select();
      document.execCommand("Copy");
    })
  }
}