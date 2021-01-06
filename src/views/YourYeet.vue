<template>
    <div class="your-yeet">
        <TopBar/>
        <h1 class=shimmer>yeetmeinto.space</h1>
        <div class="yeet-me">
            <div v-bind:class=" { yeeted: loading }">
                <YeetMe/>
            </div>
            <span v-if="done" class="star">&#9733;</span>
        </div>
    </div>
</template>

<script>
import TopBar from "../components/TopBar"
import YeetMe from "../components/YeetMe"
import { eventBus } from "../main";

export default {
    name: "YourYeet",
    components: {
        TopBar,
        YeetMe
    },
    data() {
        return {
            messages: [], 
            loading: false,
            done: false
        }
    },

    created: function() {
        eventBus.$on("yeetme-success", (bodyContent) => {
            this.loading = true;
            this.done = true;
            setTimeout(() => {
                this.messages.push("You have been yeeted!");
                this.messages.push(`Quote: ${bodyContent.quote}`)
                this.clearMessages();
                this.$router.push({ name: 'Home' });
            }, 1000);
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

.yeet-me {
    position: relative;
}

.yeeted {
    animation: yeet 1000ms linear;
}

@keyframes yeet {
    0%   {transform: rotate(0deg) scale(1); opacity: 1;}
    25%  {transform: rotate(360deg) scale(0.75); opacity: 0.75;}
    50%  {transform: rotate(720deg) scale(0.5); opacity: 0.5;}
    75%  {transform: rotate(1080deg) scale(0.25); opacity: 0.25;}
    100% {transform: rotate(1440deg) scale(0.0); opacity: 0.0;}
}


span {
    color: white;
    position: absolute;
    top: -40px;
    left: 33%;
    font-size: 20rem;
}

.star {
    animation: star 1000ms linear;
}

@keyframes star {
    0%   {transform: rotate(0deg) scale(1); opacity: 0;}
    25%  {transform: rotate(360deg) scale(0.75); opacity: 0.25;}
    50%  {transform: rotate(720deg) scale(0.5); opacity: 0.5;}
    75%  {transform: rotate(1080deg) scale(0.25); opacity: 0.75;}
    100% {transform: rotate(1440deg) scale(0); opacity: 1.0;}
}

</style>