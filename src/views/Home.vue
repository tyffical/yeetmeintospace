<template>
  <div id="app">
    <div v-if="isSignedIn">
      <TopBar/> 
      <h1 class=shimmer>yeetmeinto.space</h1>
      <Yeets/>
      <!-- <div v-if="yeeted" class="yeets"> -->
        <!-- <YeetMe/> -->
        <!-- <Yeets/> -->
      <!-- </div> -->
      <!-- <div v-else> -->
        <!-- <YeetMe/> -->
      <!-- </div> -->
    </div>
    <div v-else>
      <h1 style="margin-top: 15%" class=shimmer>yeetmeinto.space</h1>
      <SignIn/>
    </div>

    <div v-if='messages.length' class="message" style="width: 250px;">
      <br/>
      <b>Messages:</b>
      <ul>
          <li v-for='message in messages' v-bind:key='message.id'>{{ message }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import TopBar from '../components/TopBar.vue'
import SignIn from '../components/SignIn.vue'
import Yeets from '../components/Yeets.vue'
import { eventBus } from "../main";
// import axios from "axios";

export default {
  name: 'App',
  components: {
    TopBar,
    SignIn,
    Yeets
  },
  data() {
    return {
      isSignedIn: false,
      // yeeted: false,
      messages: [],
      username: this.$cookie.get('yeetmeintospace-auth')
    }
  },

  created: function() {
    console.log(`username: ${this.username}`);
    let authenticated = this.$cookie.get('yeetmeintospace-auth');
    console.log(`authenticated: ${authenticated}`);
    if (authenticated && authenticated !== undefined && authenticated.length !== 0) {
      this.isSignedIn = true;
    }
    // if (this.username) {
    //   this.isSignedIn = true;
    //   axios
    //     .get(`/api/users/yeet/${this.username}`)
    //     .then((res) => {
    //       // handle success
    //       this.messages.push(res.data.quote);
    //       this.yeeted = true;
    //     })
    //     .catch(err => {
    //       // handle error
    //       this.messages.push(err);
    //       // this.messages.push(err.response.data.message);
    //     })
    //     .then(() => {
    //       // always executed
    //       this.clearMessages();
    //     });
    // }

    eventBus.$on("signin-success", (bodyContent) => {
      this.$cookie.set('yeetmeintospace-auth', bodyContent.username);
      this.isSignedIn = true;
      this.messages.push("You have been signed in!");
      this.clearMessages();
      this.$forceUpdate();
    });

    eventBus.$on("signup-success", (bodyContent) => {
      this.$cookie.set('yeetmeintospace-auth', bodyContent.username);
      this.isSignedIn = true;
      this.messages.push("You have been signed up!");
      this.clearMessages();
      this.$forceUpdate();
    });

    // eventBus.$on("yeetme-success", (bodyContent) => {
    //   this.yeeted = true;
    //   this.messages.push("You have been yeeted!");
    //   this.messages.push(`Quote: ${bodyContent.quote}`)
    //   this.clearMessages();
    //   this.$forceUpdate();
    // });
  },

  methods: {
    clearMessages: function() {
      setInterval(() => {
        this.messages = [];
      }, 5000);
    }
  }
}
</script>

<style scoped>
.message {
  color: white;
}

</style>