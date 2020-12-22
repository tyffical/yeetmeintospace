<template>
  <div class="settings">
    <TopBar/> 
    <h1 class="shimmer">yeetmeinto.space</h1>
    <div class="actions">
      <form v-on:submit.prevent="changeUsername" method="post">
        <input id='username' v-model.trim='newUsername' type='text' name='username' placeholder="New Username">
        <br/>
        <input type='submit' value='Update Username' class="change">
      </form>
      <form v-on:submit.prevent="changePassword" method="post">
        <input id='password' v-model.trim='newPassword' type='password' name='password' placeholder="New Password">
        <br/>
        <input type='submit' value='Update Password' class="change">
      </form>
      <div class="buttons">
        <button id="delete" v-on:click="deleteAccount" class="change">Delete Account</button>
        <button id="signout" v-on:click="signOut" class="change">Sign Out</button>
      </div>
      <div v-if='errors.length' class="error-message" style="width: 250px;">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
        </ul>
      </div>
      <div v-if='messages.length' class="message" style="width: 250px;">
      <br/>
      <b>Messages:</b>
      <ul>
          <li v-for='message in messages' v-bind:key='message.id'>{{ message }}</li>
      </ul>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";
import TopBar from "../components/TopBar";

export default {
  name: "Settings",
  components: {
    TopBar,
  },
  
  data() {
    return {
      errors: [],
      messages: [],
      newUsername: "",
      newPassword: ""
    }
  },

  created: function() {
    
    eventBus.$on("signout-success", () => {
      this.$cookie.set('yeetmeintospace-auth', '');
      this.isSignedIn = false;
      this.messages.push("You have been signed out!");
      this.clearMessages();
    });

    eventBus.$on("delete-success", () => {
      this.$cookie.set('yeetmeintospace-auth', '');
      this.isSignedIn = false;
      this.messages.push("You have deleted your account :(");
      this.clearMessages();
    });

    eventBus.$on("username-change-success", (bodyContent) => {
      this.$cookie.set('yeetmeintospace', bodyContent.username);
      this.messages.push("You have changed your username!");
      this.clearMessages();
    });

    eventBus.$on("password-change-success", (bodyContent) => {
      this.$cookie.set('yeetmeintospace-auth', bodyContent.password);
      this.messages.push("You have changed your password!");
      this.clearMessages();
    });
  },

  methods: {
    changeUsername: function() {
      const bodyContent = { username: this.newUsername }
      axios
        .put(`/api/users/username`, bodyContent)
        .then(() => {
          // handle success
          eventBus.$emit('username-change-success', bodyContent);
        })
        .catch(err => {
          // handle error
          this.errors.push(err.response.data.error);
        })
        .then(() => {
          // always executed
          this.newUsername = "";
        });
    },

    changePassword: function() {
      const bodyContent = { password: this.newPassword };
      axios
        .put("/api/users/password", bodyContent)
        .then(() => {
          // handle success
          eventBus.$emit('password-change-success', bodyContent);
        })
        .catch(err => {
          // handle error
          this.errors.push(err.response.data.error);
        })
        .then(() => {
          // always executed
          this.newPassword = "";
        });
    },

    signOut: function() {
      axios.delete('/api/users/session')
        .then(() => {
          // handle success
          eventBus.$emit('signout-success', true);
        })
        .catch(() => {
          // Still sign User out so they have to sign in again.
          eventBus.$emit('signout-success', true);
        })
        .then(() => {
          this.$router.push({ name: 'Home' });
        })
    },

    deleteAccount: function() {
      axios.delete('/api/users')
        .then(() => {
          // handle success
          eventBus.$emit('delete-success', true);
        })
        .catch(() => {
          // Sign User out so they have to sign in again.
          eventBus.$emit('signout-success', true);
        })
        .then(() => {
          this.$router.push({ name: 'Home' });
        })
    },

    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
        this.messages = [];
      }, 5000);
    },
  }
}
</script>

<style scoped>
#username, #password {
  width: 300px;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  font-size: 18px;
  font-family: 'Courier New', Courier, monospace;
  border-color: white;
  background-color: black;
  color: white;
}

#username::placeholder, #password::placeholder {
  color: white;
}

#password {
  margin-top: 2rem;
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  /* position: relative; */
  /* background-color: white; */
}

.buttons {
  display: flex;
  margin-top: 1rem;
}

#delete {
  margin-left: 5%;
  margin-right: 5%;
}

#signout {
  margin-left: 5%;
  margin-right: 5%;
}

.change {
  color:black;
  margin: 1rem 3rem 1rem 3rem;
  font-size: 16px;
  font-weight: 700;
  
  cursor: pointer;
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border: transparent;
  border-radius: 15px;
  padding: 12px 32px;
  width: 200px;
  text-align: center;
  font-family: cursive;
}

.change:hover {
    opacity: 0.8;
    color: grey;
}

h1 {
  margin-top: 0%;
  margin-bottom: 5%;
}

.error-message {
  color: red;
}

.message {
  color: white;
}

</style>
