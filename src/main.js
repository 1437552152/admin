import Vue from 'vue';
import iView from 'iview';
import { router, initRouter } from './router/index';
import { appRouter } from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from '@/libs/util';
import axios from 'axios';
import qs from 'qs';
import Api from '@/config/api';
import Cookies from 'js-cookie';
import Viser from 'viser-vue';
import { setStore, getStore, removeStore } from "@/config/storage.js";
import base from '@/libs/base'

Vue.prototype.$ajax = axios;
axios.defaults.withCredentials = true;
axios.interceptors.response.use((response) => {
  const data = response.data
  let baseURL = response.config.baseURL;
  let url = response.config.url;

  if (data.code === 4000) {
    Cookies.remove('user');
    Cookies.remove('userPhone');
    Cookies.remove('userInfo');
    router.push({ name: 'login' });
  }
  if (data.code === 5000) {
    router.push({ name: 'error-403' });
  }
  return response;
})

// axios.interceptors.request.use((config) => {
//   config.headers['x-auth-token'] = Cookies.get('x-auth-token');
//   return config;
// })

Vue.prototype.api = Api;
Vue.use(VueI18n);
Vue.use(iView);
Vue.use(Viser);
Vue.use(base)

new Vue({
  el: '#app',
  router: router,
  store: store,

  render: h => h(App),
  data: {
    currentPageName: ''
  },
  mounted() {
    this.currentPageName = this.$route.name;
    // 显示打开的页面的列表
    this.$store.commit('setOpenedList');
    this.$store.commit('initCachepage');
    // 权限菜单过滤相关
    this.$store.commit('updateMenulist');
    // iview-admin检查更新
    // util.checkUpdate(this);
    //

  },
  created() {
    let tagsList = [];
    appRouter.map((item) => {
      if (item.children.length <= 1) {
        tagsList.push(item.children[0]);
      } else {
        tagsList.push(...item.children);
      }
    });
    this.$store.commit('setTagsList', tagsList);
  }
});