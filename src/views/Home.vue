<template>
  <div id="app">
    <div v-if="isSignedIn">
      <TopBar/> 
      <h1 class=shimmer>yeetmeinto.space</h1>
    </div>
    <div v-else>
      <h1 style="margin-top: 15%" class=shimmer>yeetmeinto.space</h1>
      <SignIn/>
    </div>
  </div>
</template>

<script>
import TopBar from '../components/TopBar.vue'
import SignIn from '../components/SignIn.vue'
import { eventBus } from "../main";

export default {
  name: 'App',
  components: {
    TopBar,
    SignIn
  },
  data() {
    return {
      isSignedIn: false,
      messages: []
    }
  },

  created: function() {
    let authenticated = this.$cookie.get('yeetmeintospace-auth');
    if (authenticated) {
      this.isSignedIn = true;
    }

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
  }
}
</script>

<style>

</style>