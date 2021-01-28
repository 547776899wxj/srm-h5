import Vue from 'vue'
import App from './App'
import util from './common/util'
import tui  from './common/webview.js'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$util = util
Vue.prototype.$tui = tui
const app = new Vue({
    ...App
})
app.$mount()
