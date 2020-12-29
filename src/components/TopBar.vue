<template>
  <div class="topbar">

    <div v-if="isSignedIn" id="icons">
      <div class="icon"> 
        <router-link to="/">
          <div id="home"> home </div>
        </router-link>
      </div>

      <div class="icon"> 
        <router-link to="/youryeet">
          <div id="youryeet"> your yeet </div>
        </router-link>
      </div>

      <div class="icon"> 
        <router-link to="/settings">
          <div id="settings"> settings </div>
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