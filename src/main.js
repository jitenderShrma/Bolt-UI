// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './polyfill'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router/index'
import VueSelect from "vue-cool-select";
import './ml'
import { GridPlugin } from '@syncfusion/ej2-vue-grids';
import VueSession from 'vue-session'
import { TreeGridPlugin } from '@syncfusion/ej2-vue-treegrid';
import VeeValidate from 'vee-validate';
import VueBlu from 'vue-blu'
import HighchartsVue from 'highcharts-vue'
import { setCurrencyCode} from '@syncfusion/ej2-base';
import {setCulture} from '@syncfusion/ej2-base';
import { loadCldr } from '@syncfusion/ej2-base';
loadCldr(
    require('cldr-data/main/en-IN/ca-gregorian.json'),
    require('cldr-data/main/en-IN/timeZoneNames.json'),
    require('cldr-data/main/en-IN/numbers.json'),
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/en-IN/currencies.json')
    );
setCulture('en-IN')
setCurrencyCode('INR');
Vue.use(HighchartsVue)
Vue.use(VueBlu)
Vue.use(require('vue-moment'));
Vue.use(VeeValidate);
Vue.use(TreeGridPlugin);
Vue.use(VueSession);
Vue.use(GridPlugin);
Vue.use(BootstrapVue)
Vue.use(VueSelect, {
  theme: 'bootstrap' // "bootstrap" or 'material-design'
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
  components:{
  	App
  }
}).$mount('#app')
