<script setup>
import inputComp from '@/components/input.vue'
import buttonComp from '@/components/button.vue'
import { useLoginStore } from '../stores/login';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const userStore = useLoginStore();
const nameDesc = ref({
    id : '',
    name : '',
    description : ''
});
// const router = useRouter()
const route = useRoute()

onMounted(async() => {
    await userStore.getTitles();
    if (route.params.id){
        nameDesc.value = userStore.getTitleById(route.params.id)
    } else {
        console.log(route.params);
        console.log('aa');
        // router.push({ name : 'title'})
    }
})

function updateButton(){
    userStore.updateTitle(nameDesc.value)
    console.log(nameDesc.value);
    
}
// {name : nameDesc.value.name, description : nameDesc.value.description}
</script>
<template>
    <div class="w-2/3 md:w-1/3">
        <form action="" @submit.prevent="updateButton" class="flex flex-col items-center bg-white rounded-md p-10 gap-8">
            <h1 class="text-xl">Update</h1>
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
                    class="border p-2 mt-4 rounded-md"
                    >IPTAL
                </router-link>
                <buttonComp buttonName="Update" type="submit"/>
            </div>
        </form>
    </div>
</template>