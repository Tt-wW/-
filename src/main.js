import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'


// 全局组件
import TypeNav from './components/TypeNav/TypeNav.vue'
import Carousel from './components/Carousel/carousel.vue'
import Pagination from './components/Pagination/Pagination.vue'

// mock假数据，拦截ajax
import './mock/mockServer'
// 轮播图样式
import 'swiper/css/swiper.css'



// 套路
import * as API from '@/api'


// 饿了么
import {MessageBox} from 'element-ui'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 懒加载
import VueLazyload from 'vue-lazyload'
import location from '@/assets/logo.png'

// 表单验证
import { ValidationProvider,ValidationObserver} from 'vee-validate';
import   './utils/veevalidate'
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);





Vue.use(VueLazyload,{
  // preLoad: 1.3,
  // error: 'dist/error.png',
  // 懒加载默认图片
  loading: location,
  // attempt: 1
})


Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus =this
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
