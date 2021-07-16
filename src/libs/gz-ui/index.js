
import gzSelector from './components/Selector/index.vue'
import gzModal from './components/Modal/index.vue'

let gzUI = {};
gzUI.install = function (Vue) {
  Vue.component(gzSelector.name, gzSelector)
  Vue.component(gzModal.name, gzModal)
}

export default gzUI;