<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/imgs/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

export default Vue.extend({
  name: 'HomeView',
  components: {
    HelloWorld
  }
})
</script>
