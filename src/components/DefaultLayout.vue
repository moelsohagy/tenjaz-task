<script setup>
import { ref } from 'vue'
import MainHeader from './MainHeader.vue'
import Sidebar from './Sidebar.vue'

const opened = ref(true)

const changeOpened = () => {
  opened.value = !opened.value
}
</script>

<template>
  <div>
    <MainHeader @changeOpened="changeOpened" />

    <div>
      <Sidebar :opened="opened" />

      <div class="p-4 pt-20 sm:ml-64">
        <router-view />
      </div>
    </div>
  </div>
</template>
