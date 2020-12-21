<template>
  <div class="topbar">

    <!-- <span id="title"> yeetmeinto.space </span> -->

    <div id="icons">
      <div class="icon"> 
        <router-link to="/">
          <div id="home"> home </div>
          <!-- <img alt="Home" src="../assets/home.png" v-on:click="clicked('home')" width=35 height=35>  -->
        </router-link>
      </div>

      <div class="icon"> 
        <router-link to="/settings">
          <div id="settings"> settings </div>
          <!-- <img alt="Home" src="../assets/settings.png" v-on:click="clicked('settings')" width=35 height=35>  -->
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
  methods: {
    clicked: function(event) {
      // alert(event);
      console.log(event);
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

#home:hover, #settings:hover {
  text-decoration: underline;
}

div {
  color: white;
  font-family: fantasy;
}

</style>