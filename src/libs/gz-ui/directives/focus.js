export default {
  mounted(el) {
    const oSelectorInput = el.querySelector(".selector-input"),
      oInput = oSelectorInput.querySelector("input"),
      oSpan = oSelectorInput.querySelector("span"),
      oSelectorMenu = el.querySelector(".selector-menu");
    // 聚焦
    oInput.addEventListener("focus", function (e) {
      e.target.placeholder = "";
      oSpan.setAttribute("class", "focus");
      oInput.setAttribute("class", "focus");
      setTimeout(() => {
        oSelectorMenu.style.display = "block";
      }, 200);
    })

    // 失焦
    oInput.addEventListener("blur", function (e) {
      oSpan.removeAttribute("class", "focus");
      oInput.removeAttribute("class", "focus");
      setTimeout(() => {
        oSelectorMenu.style.display = "none";
        // 如果输入框无值,显示placeholder
        if (this.value.length == 0) {
          e.target.placeholder = oInput.getAttribute("data-placeholder")
        }
      }, 200);

    })
  }
}