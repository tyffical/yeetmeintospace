<template>
  <div class="home">
    <TopBar/> 
    <h1 class=shimmer>yeetmeinto.space</h1>
    <Yeets/>
  </div>
</template>

<script>
import TopBar from '../components/TopBar.vue'
import Yeets from '../components/Yeets.vue'

export default {
  name: 'App',
  components: {
    TopBar,
    Yeets
  }
}
</script>

<style scoped>
.message {
  color: white;
}

</style>