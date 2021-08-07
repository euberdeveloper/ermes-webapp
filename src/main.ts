import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import vuetify from '@/plugins/vuetify';
import '@/plugins/validator';

Vue.config.productionTip = false

async function main() {
  new Vue({
    router,
    vuetify,
    render: h => h(App)
  }).$mount('#app');
}
main();

