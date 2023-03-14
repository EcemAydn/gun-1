<script setup>
import inputComp from './input.vue';
import buttonComp from './button.vue';
import { useTitleStore } from '../stores/titles';
import { useAlertStore } from '../stores/alert';
import { useModalStore } from '../stores/modal';
import { onMounted, ref } from 'vue';

const titleStore = useTitleStore();
const alertStore = useAlertStore();
const modalStore = useModalStore();
const title = ref({
    id : '',
    name: null,
    description: null,
});

const props = defineProps({
  item: {
    type: Object,
  }
});

onMounted(() => {
  if(props.item) {
    title.value = props.item;
  }
})

function saveButton(){
  if(props.item){
    titleStore.updateTitle(title.value)
    .then(() => {
        modalStore.closeModal()
        alertStore.addAlert({ message: 'Created!', color: 'success' });
    })
    .catch(() => {
        alertStore.addAlert({ message: 'Error!', color: 'error' });
    })
  }else{
    titleStore.createTitle({name: title.value.name, description: title.value.description})
    .then(() => {
        modalStore.closeModal()
        alertStore.addAlert({ message: 'Created!', color: 'success' });
    })
    .catch(() => {
        alertStore.addAlert({ message: 'Error!', color: 'error' });
    })
  }
}

function closeModalButton(){
    modalStore.closeModal();
}

// onMounted(async() => {
//     await titleStore.getTitles();
//     if (route.params.id){
//         title.value = titleStore.getTitleById(item.id)
//     } else {
//         console.log('olmadi');
//     }
// })

// function updateButton(){
//     titleStore.updateTitle({ name: title.value.name, description: title.value.description})
//     .then(() => {
//     alertStore.addAlert({ message: 'Updated!', color: 'success' });
//     })
//     .catch(() => {
//     alertStore.addAlert({ message: 'Error!', color: 'error' });
//     })
// }



</script>

<template>
    <form @submit.prevent="saveButton" class="flex flex-col items-center p-10 gap-4">
        <h1 class="text-xl"> {{ item ? 'Update': 'Create' }} Title </h1>
        <div class="w-full flex flex-col gap-2">
            <inputComp 
                v-model="title.name" 
                label="Name" />
            <inputComp 
                v-model="title.description" 
                label="Description" />
        </div>
        <div class="w-full flex justify-end items-center gap-2">
            <button 
                @click="closeModalButton" 
                class="border p-2 rounded-md"
                >Cancel
            </button>
            <buttonComp buttonName="Save" type="submit"/>
        </div>
    </form>
</template>