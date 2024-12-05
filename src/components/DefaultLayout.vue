<script setup>
import MainHeader from './MainHeader.vue'
import Sidebar from './Sidebar.vue'
</script>

<template>
  <div>
    <MainHeader />

    <div>
      <Sidebar />

      <div class="p-4 pt-20 sm:ml-64">
        <router-view />
      </div>
    </div>
  </div>
</template>
