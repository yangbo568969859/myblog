import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/plugins/vant.ts'
import { init, bind } from '@/utils/custom-life-cycle'
import '@/utils/vue-prototype.ts'
import '@/components/test/v-loading'

// 引入 normalize.css
import 'normalize.css/normalize.css'
import '@/assets/style/default.scss'
import '@/assets/style/global.scss'
import '@/assets/style/home.scss'

init();

// 注册全局组件
Vue.component('a-loading', () => import(/* webpackChunkName: "a-loading" */ './components/test/loading.vue'))
Vue.component('icon-svg', () => import(/* webpackChunkName: "icon-svg" */ './components/common/Icon.vue'))
Vue.component('custom-swiper', () => import(/* webpackChunkName: "custom-swiper" */ './components/swiper/CustomSwiper.vue'))
Vue.component('custom-table', () => import(/* webpackChunkName: "custom-table" */ './components/table/CommonWrapper.vue'))
Vue.component('table-title', () => import(/* webpackChunkName: "table-title" */ './components/table/TableTitle.jsx'))
Vue.component('title-num', () => import(/* webpackChunkName: "table-title" */ './components/home/TitleNum.vue'))
Vue.component('global-header', () => import(/* webpackChunkName: "table-title" */ './components/home/NewGlobalHeader.vue'))
Vue.component('recent-number', () => import(/* webpackChunkName: "table-title" */ './components/home/RecentNumber.vue'))
Vue.component('select-time', () => import(/* webpackChunkName: "table-title" */ './components/home/SelectTime.vue'))

Vue.config.productionTip = false;

const vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

bind(vm);
