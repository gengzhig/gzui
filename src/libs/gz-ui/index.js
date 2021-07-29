/*
 * @Author: gz
 * @Date: 2021-07-26 09:45:53
 * @LastEditors: gz
 * @LastEditTime: 2021-07-29 16:46:40
 * @Description: file content
 */

import gzSelector from './components/Selector/index.vue'
import gzModal from './components/Modal/index.vue'
import gzFiveStar from './components/FiveStar/index.vue'
import gzVirtualList from './components/virtualList/index.vue'
import gzTabs from './components/Tabs/index.vue'

let gzUI = {};
gzUI.install = function (Vue) {
  Vue.component(gzSelector.name, gzSelector)
  Vue.component(gzModal.name, gzModal)
  Vue.component(gzFiveStar.name, gzFiveStar)
  Vue.component(gzVirtualList.name, gzVirtualList)
  Vue.component(gzTabs.name, gzTabs)
}

export default gzUI;