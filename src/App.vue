<script setup>
import { useLoginStore } from './stores/login'
import { useAlertStore } from './stores/alert'
import notificationComp from './components/notifications.vue';

const userStore = useLoginStore();
const alertStore = useAlertStore();
userStore.getUser();
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center text-sm gap-6 bg-gray-100">
    <div class="top-5 right-5 absolute z-50 w-1/3 flex flex-col gap-2">
      <notificationComp v-for="alert in alertStore.alerts" :message="alert.message" :color="alert.color" />
    </div>

    <RouterView />
  </div>
</template>