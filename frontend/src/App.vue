<script setup lang="ts">
import UserInterface from './components/UserInterface.vue'
</script>

<template>
  <div class="app-container">
    <UserInterface />
  </div>
</template>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
</style>