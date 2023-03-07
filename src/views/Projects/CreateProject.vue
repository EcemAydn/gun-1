<script setup>
import inputComp from '@/components/input.vue';
import buttonComp from '@/components/button.vue';
import navbarComp from '../../components/navbar.vue';
import { useProjectStore } from '../../stores/projects';
import { useAlertStore } from '@/stores/alert';
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


function saveButton(){
    projectStore.createProject({name: project.value.name, description: project.value.description});
    router.push({ name : 'projects'})
    .then(() => {
    alertStore.addAlert({ message: 'Created!', color: 'success' });
    })
    .catch(() => {
    alertStore.addAlert({ message: 'Error!', color: 'error' });
    })
}



</script>

<template>
    <navbarComp />
        <div class="w-full h-full flex items-center justify-center">
            <form action="" @submit.prevent="saveButton()" class="flex flex-col w-2/3 md:w-1/3 items-center bg-white p-10 rounded-md gap-4">
                <h1 class="text-xl">Create Project</h1>
                <div class="w-full flex flex-col gap-2">
                    <inputComp v-model="project.name" label="Name" />
                    <inputComp v-model="project.description" label="Description" />
                    <!-- <inputComp type="date" v-model="project.created" label="Created" /> -->
                </div>
                <div class="w-full flex justify-end items-center gap-2">
                    <router-link :to="{ name : 'projects' }" class="border p-2 rounded-md">Cancel</router-link>
                    <buttonComp buttonName="Save" type="submit"/>
                </div>
            </form>
        </div>
    
</template>