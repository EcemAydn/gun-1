<script setup>
import inputComp from '@/components/input.vue'
import buttonComp from '@/components/button.vue'
import navbarComp from '../../components/navbar.vue';
import { useTitleStore } from '../../stores/titles';
import { useAlertStore } from '@/stores/alert';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const titleStore = useTitleStore();
const alertStore = useAlertStore();

const nameDesc = ref({
    id : '',
    name : '',
    description : ''
});
console.log(nameDesc);
const router = useRouter()
const route = useRoute()

onMounted(async() => {
    await titleStore.getTitles();
    if (route.params.id){
        nameDesc.value = titleStore.getTitleById(route.params.id)
    } else {
        console.log(route.params);
        console.log('aa');
    }
})

function updateButton(){
    titleStore.updateTitle(nameDesc.value)
    router.push({ name : 'title'})
    .then(() => {
    alertStore.addAlert({ message: 'Updated!', color: 'success' });
    })
    .catch(() => {
    alertStore.addAlert({ message: 'Error!', color: 'error' });
    })
    
}
// {name : nameDesc.value.name, description : nameDesc.value.description}
</script>
<template>
  <navbarComp />
  <div class="h-full w-full flex items-center justify-center">
        <form @submit.prevent="updateButton" class="w-2/3 md:w-1/3 flex flex-col items-center bg-white rounded-md p-10 gap-8">
            <h1 class="text-xl">Update Title</h1>
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
                    :to= "{ name : 'title'}"
                    class="border p-2 rounded-md"
                    >Cancel
                </router-link>
                <buttonComp buttonName="Update" type="submit"/>
            </div>
        </form>
    </div>
</template>