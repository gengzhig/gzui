
import gzSelector from './components/Selector/index.vue'
import gzModal from './components/Modal/index.vue'
import gzFiveStar from './components/FiveStar/index.vue'

let gzUI = {};
gzUI.install = function (Vue) {
  Vue.component(gzSelector.name, gzSelector)
  Vue.component(gzModal.name, gzModal)
  Vue.component(gzFiveStar.name, gzFiveStar)
}

export default gzUI;