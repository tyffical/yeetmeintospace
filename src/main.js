import Vue from 'vue'
import VueCookie from 'vue-cookie'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import { firestorePlugin } from 'vuefire'

Vue.use(firebase);
Vue.use(firestorePlugin);
Vue.use(VueCookie);

export const eventBus = new Vue();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDGFBTYvc3gBvHtDJOuKXU9STT_7R8ouZI",
  authDomain: "yeetmeinto-space.firebaseapp.com",
  projectId: "yeetmeinto-space",
  storageBucket: "yeetmeinto-space.appspot.com",
  messagingSenderId: "730764694666",
  appId: "1:730764694666:web:31f523a865b7be15124973",
  measurementId: "G-Z1PFBVC184"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
