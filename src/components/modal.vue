<script setup>
import CreateTitleModal from './CreateTitleModal.vue';
import CreateProjectModal from './CreateProjectModal.vue';
import CreateMemberModal from './CreateMemberModal.vue';
import CreateMissionModal from './CreateMissionModal.vue';
import buttonComp from './button.vue';
import { useModalStore } from '../stores/modal';
import { ref } from 'vue';

const modalStore = useModalStore();
const showComp = ref(false)
function closeModalButton() {
  modalStore.closeModal()
}

</script>
<template>
  <!-- <component :is="inputComp"></component> -->
  <div @click="closeModalButton"
    class="w-full h-full fixed flex flex-col items-center justify-center z-50 left-0 right-0 top-0 bottom-0 bg-black/30">
    <div @click.stop class="w-2/3 md:w-1/3 flex flex-col items-center bg-white rounded-md">
      <button class="w-full text-right font-bold bg-white p-1 px-3 rounded-full" @click="closeModalButton">x</button>
      <slot>

      </slot>

    </div>
  </div>
</template>


