<template>
    <div class="yeet-list">
        <div v-if='yeets.length' class="yeets" style="width: 250px;">
            <br/>
            <!-- <h2>Yeets:</h2> -->
            <div class="yeet" v-for='yeet in yeets' v-bind:key='yeet.id'> 
                <span style="font-weight: bold; text-decoration: underline">{{ yeet.username }}</span>: 
                <br> <br> <span>"{{ yeet.quote}}"</span>
            </div>
        </div>

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

export default {
    name: 'Yeets',
    data() {
        return {
            errors: [],
            yeets: [],
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
                            let yeet = {username: user, quote: thisquote};
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
    }
}
</script>

<style scoped>

.yeet-list {
    color: white;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 1rem;
    margin-left: 5%;
    width: 100%;
    height: 100%;
    margin-right: 5%;
}

.yeets {
    margin: 0;
    padding: 0;
    /* display: flex;
    flex-direction: row;
    flex-wrap: wrap; */
    /* overflow-y: scroll;
    overflow-x: visible; */
    /* overflow: auto; */
    /* display: grid;
    grid-template-columns: repeat(auto-fill,minmax(160px, 1fr)); */
    /* display: flex; */
    /* flex-direction: row; */
    /* flex-wrap: wrap; */
}

.yeet {
    width: 300px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    font-size: 18px;
    font-family: 'Courier New', Courier, monospace;
    border-color: white;
    border-style: outset;
    border-radius: 1rem;
    background-color: black;
    color: white;
    opacity: 0.8;
}

.error-message {
    color: red;
}

</style>