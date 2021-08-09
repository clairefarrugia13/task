<template>
  <div id="app">
    <Users/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Users from './components/Users.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Users
  }
});
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;}
</style>
