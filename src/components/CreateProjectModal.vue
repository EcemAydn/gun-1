<script setup>
import inputComp from './input.vue';
import buttonComp from './button.vue';
import { useProjectStore } from '../stores/projects';
import { useAlertStore } from '../stores/alert';
import { useModalStore } from '../stores/modal';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const projectStore = useProjectStore();
const project = ref({
    id:'',
    name:null,
    description:null,   
    created: '',
    updated: ''
});
const router = useRouter();
const alertStore = useAlertStore();
const modalStore = useModalStore();

function saveButton(){
    projectStore.createProject({name: project.value.name, description: project.value.description})
    .then(() => {
    modalStore.closeModal();
    alertStore.addAlert({ message: 'Created!', color: 'success' });
    })
    .catch(() => {
    alertStore.addAlert({ message: 'Error!', color: 'error' });
    })
}

function closeProjectModal(){
    modalStore.closeModal();
}

</script>
<template>
    <form @submit.prevent="saveButton()" class="flex flex-col items-center p-10 gap-4">
        <h1 class="text-xl">Create Project</h1>
        <div class="w-full flex flex-col gap-2">
            <inputComp v-model="project.name" label="Name" />
            <inputComp v-model="project.description" label="Description" />
            <!-- <inputComp type="date" v-model="project.created" label="Created" /> -->
        </div>
        <div class="w-full flex justify-end items-center gap-2">
            <button @click="closeProjectModal" class="border p-2 rounded-md">Cancel</button>
            <buttonComp buttonName="Save" type="submit"/>
        </div>
    </form>
</template>