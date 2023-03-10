import { ref } from 'vue';
import { defineStore } from 'pinia';


export const useModalStore = defineStore('modal', () => {
    const modals = ref([]);
  
    function addModal(modal){
        modals.value.push(modal);
    }

    function closeModal(){
        modals.value.pop();
    }

    return {modals, addModal, closeModal}
})