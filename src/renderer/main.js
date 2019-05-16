// @ts-nocheck

//import 'vue-material/dist/vue-material.css';
import '@/assets/material-icons/material-icons.css';
import '@/assets/roboto/roboto.css';

import Vue from 'vue';
import axios from 'axios';

import App from '@/App';
import router from '@/router';
import store from '@/store';

import World from '@/gl/World';
import log from 'electron-log';


window.logErr = function(val) {
    if(process.env.NODE_ENV === 'development') {
        // Stack trace with source mapping.
        throw new Error(val)
    } else {
        // Log error to file so we can troubleshoot user problems.
        log.error(`${val} ${new Error().stack}`)
    }
}

window.logInfo = function(val) {
    if(process.env.NODE_ENV === 'development') {
        console.log(val);
    } 
}

window.world = new World()

import './Drop';

window.addEventListener('resize', () => {
    window.world.onResize();
});

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false


// import vueDragAndDropList from 'vue-drag-and-drop-list';
// Vue.use(vueDragAndDropList);

import VueMaterial from 'vue-material'
import VModal from 'vue-js-modal'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.use(VModal)


/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app')
