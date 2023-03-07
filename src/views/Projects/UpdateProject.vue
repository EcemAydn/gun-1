<script setup>
import inputComp from '@/components/input.vue'
import buttonComp from '@/components/button.vue'
import navbarComp from '../../components/navbar.vue';
import { useProjectStore } from '../../stores/projects';
import { useAlertStore } from '@/stores/alert';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const projectStore = useProjectStore();
const route = useRoute()
const router = useRouter()
const nameDesc = ref({
    id : '',
    name : '',
    description : '',
    created:'',
    updated:''
});
const alertStore = useAlertStore();

onMounted(async() => {
    await projectStore.getProjects();
    if (route.params.id){
        nameDesc.value = projectStore.getProjectById(route.params.id);
        console.log(route.params);
    } else {
        console.log(route.params);
        console.log('aa');
    }
})

function updateButton(){
    projectStore.updateProject(nameDesc.value);
    router.push({ name : 'projects'})
    .then(() => {
    alertStore.addAlert({ message: 'Updated!', color: 'success' });
    })
    .catch(() => {
    alertStore.addAlert({ message: 'Error!', color: 'error' });
    })
}
</script>
<template>
  <navbarComp />
    <div class="h-full w-full flex items-center justify-center">
        <form action="" @submit.prevent="updateButton" class="w-2/3 md:w-1/3 flex flex-col items-center bg-white rounded-md p-10 gap-8">
            <h1 class="text-xl">Update Project</h1>
            <div class="w-full flex flex-col gap-2">
                <inputComp 
                    v-model="nameDesc.name"
                    label="Name" />
                <inputComp 
                    v-model="nameDesc.description"
                    label="Description" />
                    
            </div>
            <div class="w-full flex items-center justify-end gap-2">
                <router-link 
                    :to= "{ name : 'projects'}"
                    class="border p-2 rounded-md"
                    >Cancel
                </router-link>
                <buttonComp buttonName="Update" type="submit"/>
            </div>
        </form>
    </div>
</template>