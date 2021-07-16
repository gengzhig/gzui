let tools = {
    // 获取dom元素css属性值
    getStyle(obj, attr) {
        if (obj.currentStyle) { // 兼容IE
            return obj.currentStyle[attr]
        } else {
            return window.getComputedStyle(obj, null)[attr]
        }
    }
}
export default tools;