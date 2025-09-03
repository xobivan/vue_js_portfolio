import 'vuetify/styles'
import { createApp } from 'vue';
import BootstrapVue3 from 'bootstrap-vue-3';
import App from './App.vue';
import { VueFire } from "vuefire";
import { db } from "./firebase/db.js";
import AnimateOnVisible from "./components/AnimateOnVisible.vue";
import 'vuetify/styles'; 
import '@mdi/font/css/materialdesignicons.css'; 

import 'bootstrap/dist/css/bootstrap.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faInstagramSquare, faLinkedin, faGithubSquare } from '@fortawesome/free-brands-svg-icons';

library.add(faCopyright, faInstagramSquare, faLinkedin, faGithubSquare);


createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('AnimateOnVisible', AnimateOnVisible)
  .use(BootstrapVue3)
  .use(VueFire, { firestore: db })
  .mount('#app');

import 'bootstrap/dist/js/bootstrap.js';
import './styles/global.scss';


