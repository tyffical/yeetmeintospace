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

export default {
    name: "YourYeet",
    components: {
        TopBar,
        YeetMe
    },
    data() {
        return {
            messages: []
        }
    },

    created: function() {
        eventBus.$on("yeetme-success", (bodyContent) => {
            this.messages.push("You have been yeeted!");
            this.messages.push(`Quote: ${bodyContent.quote}`)
            this.clearMessages();
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