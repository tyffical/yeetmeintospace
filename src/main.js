import Vue from 'vue'
import VueCookie from 'vue-cookie'
import App from './App.vue'
import router from './router'
import Firebase from 'firebase'
import { firestorePlugin } from 'vuefire'

Vue.use(Firebase);
Vue.use(firestorePlugin);
Vue.use(VueCookie);

export const eventBus = new Vue();

// var firebaseConfig = {
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: "",
//   measurementId: ""
// };

// Firebase.initializeApp(firebaseConfig); 

// Vue.config.productionTip = false

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Firebase.analytics();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
