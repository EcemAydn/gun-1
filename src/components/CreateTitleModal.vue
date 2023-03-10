<script setup>
import inputComp from './input.vue';
import buttonComp from './button.vue';
import navbarComp from './navbar.vue';
import { useTitleStore } from '../stores/titles';
import { useAlertStore } from '../stores/alert';
import { useModalStore } from '../stores/modal';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const titleStore = useTitleStore();
const alertStore = useAlertStore();
const modalStore = useModalStore();

const title = ref({
    name:null,
    description:null,
});
const router = useRouter();

function saveButton(){
    titleStore.createTitle({id: new Date().getTime(), name: title.value.name, description: title.value.description})
    .then(() => {
    modalStore.closeModal()
    alertStore.addAlert({ message: 'Created!', color: 'success' });
    })
    .catch(() => {
    alertStore.addAlert({ message: 'Error!', color: 'error' });
    })
}
function closeModalButton(){
    modalStore.closeModal()
}


</script>
<template>
    <form @submit.prevent="saveButton()" class="flex flex-col items-center p-10 gap-4">
        <h1 class="text-xl">Create Title</h1>
        <div class="w-full flex flex-col gap-2">
            <inputComp v-model="title.name" label="Name" />
            <inputComp v-model="title.description" label="Description" />
        </div>
        <div class="w-full flex justify-end items-center gap-2">
            <button @click="closeModalButton" class="border p-2 rounded-md">Cancel</button>
            <buttonComp buttonName="SAVE" type="submit"/>
        </div>
    </form>
</template>