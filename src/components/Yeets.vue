<template>
    <div class="yeet-list">
        <div v-if='yeets.length' class="yeets">
            <br/>
            <!-- <h2>Yeets:</h2> -->
            <div class="yeet" v-for='yeet in yeets' v-bind:key='yeet.id'> 
                <span class="star" v-on:click="toggle(yeet)" width=35 height=35> &#9733; </span> 
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
            invisibleClass: 'invisible'
        }
    },
    mounted() {
        axios.get(`/api/users/`)
            .then((res) => {
                console.log(res.data);
                let users = res.data.users;
                users.forEach((user) => {
                    axios.get(`/api/users/yeet/${user}`)
                        .then((res) => {
                            const fullResponse = res.response === undefined ? res : res.response;
                            let thisquote = fullResponse.data.quote;
                            let yeet = {username: user, quote: thisquote, visible: false};
                            this.yeets.push(yeet);
                        })
                        .catch((err) => {
                            this.errors.push(err);
                        });
                })
                console.log(this.yeets);
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
        clicked: function(event) {
            // alert(event);
            console.log(event);
        },
        toggle: function(yeet) {
            console.log(`toggled ${yeet.username}`);
            yeet.visible = !yeet.visible;
        },
        makeVisible: function(yeet) {
            yeet.visible = true;
        },
        makeInvisible: function(yeet) {
            yeet.visible = false;
        }
    }
}
</script>

<style scoped>

.yeet-list {
    color: white;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 1rem;
    margin-left: 5%;
    width: 90%;
    /* height: 20%; */
    height: 450px;
    /* margin-right: 5%; */
    margin-top: 5%;
    margin-bottom: 5%;
    /* margin-right: 20%; */

    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.yeets {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    width: 100%;
    /* justify-content: center; */
    justify-content: space-between;
    align-content: space-between;
    overflow-x: auto;
}

.yeet {
    margin: 20px;
    /* margin: 250px; */
    /* margin-right: 250px; */
    overflow-x: auto;
}

.star {
    cursor: pointer;
    width: fit-content;
}

.yeet-body {
    /* width: 300px; */
    width: fit-content;
    max-width: 250px;
    /* text-align: center; */
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
}

/* pointer */
.yeet-body:after {
    content: '';
	position: absolute;
	top: 0;
	left: 10%;
	width: 0;
	height: 0;
	border: 0.844em solid transparent;
	border-bottom-color: white;
	border-top: 0;
	border-left: 0;
    margin-left: -0.300em;
    margin-top: -0.900em;
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