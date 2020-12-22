<template>
    <div class="yeetme">
        <form id="yeet" class='component' method="post" v-on:submit.prevent="yeetMe">
            <input id='username' v-model.trim='username' type='text' name='username' readonly="readonly">
            <textarea rows="6"
                id='quote' v-model='quote' type='text' name='quote' placeholder="Quote">
            </textarea>
            <br/>
            <input type='submit' value='Yeet Me!' class="button">
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
    name: 'YeetMe',
    data() {
        return {
            errors: [],
            username: this.$cookie.get('yeetmeintospace-auth'),
            quote: "",
        }
    },
    methods: {
        yeetMe: function() {
            const bodyContent = { quote: this.quote };
            axios
                .post("/api/users/yeet", bodyContent)
                .then(() => {
                    // handle success
                    console.log(bodyContent.quote);
                    eventBus.$emit('yeetme-success', bodyContent);
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
            this.quote = "";
        }
    }
}
</script>


<style scoped>
#username, #quote {
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

#username::placeholder, #quote::placeholder {
  color: white;
}

.component {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button {
  color:black;
  margin-top: 1rem;
  margin-bottom: 2rem;
  margin-left: 2rem;
  margin-right: 2rem;
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