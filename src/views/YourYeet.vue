<template>
    <div class="your-yeet">
        <TopBar/>
        <h1 class=shimmer>yeetmeinto.space</h1>
        <YeetMe/>
    </div>
</template>

<script>
import TopBar from "../components/TopBar"
import YeetMe from "../components/YeetMe"
import { eventBus } from "../main";
// import axios from "axios";
export default {
    name: "YourYeet",
    components: {
        TopBar,
        YeetMe
    },
    data() {
        return {
            yeeted: false,
            messages: [],
            username: this.$cookie.get('yeetmeintospace-auth')
        }
    },

    created: function() {
        // if (this.username) {
        //     axios
        //         .get(`/api/users/yeet/${this.username}`)
        //         .then((res) => {
        //             // handle success
        //             this.messages.push(res.data.quote);
        //             this.yeeted = true;
        //         })
        //         .catch(err => {
        //             // handle error
        //             this.messages.push(err);
        //             // this.messages.push(err.response.data.message);
        //         })
        //         .then(() => {
        //             // always executed
        //             this.clearMessages();
        //         });
        // }

        eventBus.$on("yeetme-success", (bodyContent) => {
            this.yeeted = true;
            this.messages.push("You have been yeeted!");
            this.messages.push(`Quote: ${bodyContent.quote}`)
            this.clearMessages();
            // this.$forceUpdate();
            this.$router.push({ name: 'Home' });
        });
    },

    methods: {
        clearMessages: function() {
            setInterval(() => {
                this.messages = [];
            }, 5000);
        }
    }
}
</script>

<style scoped>

</style>