import 'vuetify/styles'
import { createApp } from 'vue';
import BootstrapVue3 from 'bootstrap-vue-3';
import App from './App.vue';
import { VueFire } from "vuefire";
import { db } from "./firebase/db.js"; // <-- import db
import AnimateOnVisible from "./components/AnimateOnVisible.vue";
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Global CSS has to be imported
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faInstagramSquare, faLinkedin, faGithubSquare } from '@fortawesome/free-brands-svg-icons';

library.add(faCopyright, faInstagramSquare, faLinkedin, faGithubSquare);

const vuetify = createVuetify();

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('AnimateOnVisible', AnimateOnVisible)
  .use(BootstrapVue3)
  .use(VueFire, { firestore: db })
  .use(vuetify)
  .mount('#app');

import 'bootstrap/dist/js/bootstrap.js';
import './styles/global.scss';


