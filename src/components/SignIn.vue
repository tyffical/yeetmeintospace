<template>
  <div class="sign-in">
    <form id="sign-in" class='component' method="post">
      <input id='username' v-model.trim='username' type='text' name='username' placeholder="Username">
      <input id='password' v-model.trim='password' type='password' name='password' placeholder="Password">
      <br/>
      <div class="buttons">
        <input type='submit' value='Sign Up' class="button" v-on:click.prevent="signUp">
        <input type='submit' value='Sign In' class="button" v-on:click.prevent="signIn">
      </div>
    </form>
    
    <div v-if='errors.length' class="error-message" style="width: 250px;">
      <br/>
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "SignIn",

  data() {
    return {
      errors: [],
      username: "",
      password: "",
    }
  },

  methods: {
    signUp: function() {
      const bodyContent = { username: this.username, password: this.password, code: this.code };
        axios
          .post("/api/users", bodyContent)
          .then(() => {
            // handle success
            eventBus.$emit('signup-success', true);
          })
          .catch(err => {
            // handle error
            this.errors.push(err.response.data.message);
          })
          .then(() => {
            // always executed
            this.resetForm();
            this.clearMessages();
          });
    },
    signIn: function() {
      const bodyContent = { username: this.username, password: this.password };
      axios
        .post("/api/users/session", bodyContent)
        .then(() => {
          // handle success
          eventBus.$emit('signin-success', bodyContent);
        })
        .catch(err => {
          // handle error
          this.errors.push(err.response.data.message);
        })
        .then(() => {
          // always executed
          this.resetForm();
          this.clearMessages();
        });
    },

    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
      }, 5000);
    },

    resetForm: function() {
      this.username = "";
      this.password = "";
    }
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

.component {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons {
  display: flex;
  flex-direction: row;
  align-content: center;
}

.button {
  color:black;
  margin-top: 1rem;
  margin-bottom: 2rem;
  margin-left: 5%;
  margin-right: 5%;
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

  display: inline;
}

.button:hover {
  opacity: 0.8;
  color: grey;
}

.error-message {
  color: red;
}

</style>