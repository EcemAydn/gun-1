<script setup>
import { useLoginStore } from './stores/login';
import { useAlertStore } from './stores/alert';
import { useModalStore } from './stores/modal';
import notificationComp from './components/notifications.vue';
import modalComp from './components/modal.vue';
import CreateTitleModal from './components/CreateTitleModal.vue';
import CreateMemberModal from './components/CreateMemberModal.vue';
import CreateProjectModal from './components/CreateProjectModal.vue';
import CreateMissionModal from './components/CreateMissionModal.vue';

const userStore = useLoginStore();
const alertStore = useAlertStore();
const modalStore = useModalStore();
userStore.getUser();

function getComponent(type) {
  // if(type === 'title') {
  //   return CreateTitleModal;
  // } else if(type === 'project') {
  //   return CreateProjectModal;
  // }

  switch(type) {
    case 'title':
      return CreateTitleModal;
    case 'member':
      return CreateMemberModal;
    case 'project':
      return CreateProjectModal;
    case 'mission':
      return CreateMissionModal;
    default:
      return CreateTitleModal;
  }
}
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center text-sm gap-6 bg-gray-100">
    <div class="top-5 right-5 absolute z-50 w-1/3 flex flex-col gap-2">
      <notificationComp v-for="alert in alertStore.alerts" :message="alert.message" :color="alert.color" />
      <modalComp v-for="(modal, index) in modalStore.modals" :key="index + 123123213">
        <component :is="getComponent(modal)"></component>
      </modalComp>
    </div>

    <RouterView />
  </div> 
</template>