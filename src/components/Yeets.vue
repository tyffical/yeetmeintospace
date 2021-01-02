<template>
    <div class="yeet-list">
        <div v-if='yeets.length' class="yeets">
            <div class="yeet" v-for='yeet in yeets' v-bind:key='yeet.id'> 
                <span class="star" v-on:mouseover="makeVisible(yeet)" v-on:mouseleave="makeInvisible(yeet)" v-on:click="toggle(yeet)">&#9733;</span> 
                <span class="yours" v-if='yeet.username===currentUser'>&#8592;It's you!</span>
                <div class="yeet-body" v-bind:class="yeet.visible ? visibleClass : invisibleClass">
                    <span style="font-weight: bold; text-decoration: underline">{{ yeet.username }}</span>: 
                    <br> <br> <span>"{{ yeet.quote}}"</span>
                </div>
            </div>
        </div>

        <div v-if='errors.length' class="error-message">
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

export default {
    name: 'Yeets',
    data() {
        return {
            errors: [],
            yeets: [],
            visibleClass: 'visible',
            invisibleClass: 'invisible',
            currentUser: this.$cookie.get("yeetmeintospace-auth")
        }
    },
    mounted() {
        axios.get(`/api/users/`)
            .then((res) => {
                let users = res.data.users;
                users.forEach((user) => {
                    axios.get(`/api/users/yeet/${user}`)
                        .then((res) => {
                            const fullResponse = res.response === undefined ? res : res.response;
                            let thisquote = fullResponse.data.quote;
                            let yeet = {username: user, quote: thisquote, clicked: false, visible: false};
                            this.yeets.push(yeet);
                        })
                        .catch((err) => {
                            this.errors.push(err);
                        });
                })
            })
            .catch((err) => {
                this.errors.push(err);
            })
            .then(() => {
                this.clearMessages();
            });
    },

    methods: {
        clearMessages: function() {
            setInterval(() => {
                this.errors = [];
            }, 5000);
        },
        toggle: function(yeet) {
            console.log(`toggled ${yeet.username}`);
            yeet.clicked = !yeet.clicked;
            yeet.visible = yeet.clicked;
        },
        makeVisible: function(yeet) {
            yeet.visible = true;
        },
        makeInvisible: function(yeet) {
            if (!yeet.clicked) {
                yeet.visible = false;
            }
        }
    }
}
</script>

<style scoped>

.yeet-list {
    color: white;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 1rem;
    height: 70%;
    margin-top: 5%;
    margin-bottom: 5%;
    margin-left: 5%;
    margin-right: 160px;
    /* width: 90%; */

    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.yeets {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-content: space-between;
}

.yeet {
    margin: 30px;
}

.star {
    cursor: pointer;
    width: fit-content;
    display: inline-block;
}

.star:hover {
    transition: 0.5s;
    transform: rotate(360deg);
}

.yours {
    font-family: cursive;
    position: absolute;
}

.yeet-body {
    width: fit-content;
    max-width: 200px;
    padding: 12px 20px;
    margin: 8px 2px;
    box-sizing: border-box;
    font-size: 18px;
    font-family: 'Courier New', Courier, monospace;
    border-color: white;
    border-style: outset;
    border-radius: 1rem;
    background-color: black;
    color: white;
    opacity: 0.8;

    position: absolute;
    overflow-wrap: break-word;
}

/* pointer */
.yeet-body:after {
    content: '';
	position: absolute;
	top: 0;
	left: 1rem;
	width: 0;
	height: 0;
	border: 0.844em solid transparent;
	border-bottom-color: white;
	border-top: 0;
	border-left: 0;
	margin-left: -0.312em;
	margin-top: -0.9em;
}

.visible {
    display: inherit;
}

.invisible {
    display: none;
}

.error-message {
    color: red;
}

/* width */
::-webkit-scrollbar {
  height: 10px;
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px; 
  box-shadow: inset 0 0 5px grey;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

</style>