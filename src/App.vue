<script setup>
import { useLoginStore } from './stores/login'

const userStore = useLoginStore();
userStore.getUser();
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center text-sm gap-6 bg-purple-100">
    <RouterView />
  </div>
</template>