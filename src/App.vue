<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <div class="container-fluid px-0 flex-shrink-0">
    <global-header :user="currentUser"></global-header>
    <router-view></router-view>
    <loader v-if="isLoading" text="拼命加载中" background="rgba(0, 0, 0, 0.8)"></loader>
  </div>
  <footer class="text-center py-4 text-secondary bg-light mt-auto">
    <small>
      <ul class="list-inline mb-0">
        <li class="list-inline-item">专栏</li>
        <li class="list-inline-item">课程</li>
        <li class="list-inline-item">文档</li>
        <li class="list-inline-item">联系</li>
        <li class="list-inline-item">更多1</li>
      </ul>
    </small>
  </footer>
</template>

<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import { defineComponent, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { GlobalDataProps } from './store/types';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalHeader from './components/GlobalHeader.vue';
import Loader from './base/Loader.vue';
import createMessage from './base/createMessage'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const error = computed(() => store.state.error);

    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createMessage(message, 'error')
      }
    })

    return {
      currentUser,
      isLoading,
      error
    }
  }
})
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
