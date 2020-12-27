<template>
  <div class="topbar">

    <!-- <span id="title"> yeetmeinto.space </span> -->
    <div v-if="isSignedIn" id="icons">
      <div class="icon"> 
        <router-link to="/">
          <div id="home"> home </div>
          <!-- <img alt="Home" src="../assets/home.png" v-on:click="clicked('home')" width=35 height=35>  -->
        </router-link>
      </div>

      <div class="icon"> 
        <router-link to="/youryeet">
          <div id="youryeet"> your yeet </div>
          <!-- <img alt="YourYeet" src="../assets/youryeet.png" v-on:click="clicked('youryeet')" width=35 height=35>  -->
        </router-link>
      </div>

      <div class="icon"> 
        <router-link to="/settings">
          <div id="settings"> settings </div>
          <!-- <img alt="Settings" src="../assets/settings.png" v-on:click="clicked('settings')" width=35 height=35>  -->
        </router-link>
      </div>
    </div>

    <div v-else id="icons">
      <div class="icon"> 
        <router-link to="/">
          <div id="home"> home </div>
        </router-link>
      </div>

      <div class="icon"> 
        <router-link to="/settings">
          <div id="settings"> login </div>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'TopBar',
  props: {
    msg: String
  },
  data() {
    return {
      isSignedIn: false
    }
  },
  created: function() {
    let authenticated = this.$cookie.get('yeetmeintospace-auth');
    if (authenticated && authenticated !== undefined && authenticated.length !== 0) {
      this.isSignedIn = true;
    }
  }
}
</script>

<style scoped>
.topbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0%;
  position: relative;
}
#title {
  font-size: 60px;
  margin-left: 30px;
  text-align: center;
}

#icons {
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding: 10px 0;
  margin-left: 40px;
}

.icon {
  margin-right: 30px;
}

#home:hover, #youryeet:hover, #settings:hover {
  text-decoration: underline;
}

div {
  color: white;
  font-family: fantasy;
}

</style>