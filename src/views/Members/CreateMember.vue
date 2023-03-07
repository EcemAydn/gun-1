<script setup>
import inputComp from '@/components/input.vue';
import buttonComp from '@/components/button.vue';
import navbarComp from '../../components/navbar.vue';
import { useMembersStore } from '../../stores/members'
import { useTitleStore } from '../../stores/titles';
import { useAlertStore } from '@/stores/alert';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const memberStore = useMembersStore();
const router = useRouter();
const titleStore = useTitleStore()
const title = ref({
    titleId:'',
    name:''
});
const alertStore = useAlertStore();
titleStore.getTitles()

function saveButton(){
    memberStore.createMember({id: title.value.titleId, name: title.value.name});
    router.push({ name : 'members'})
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
        <h1 class="text-xl">Create Member</h1>
        <div class="w-full flex flex-col gap-2">
            <inputComp v-model="title.name" label="Name" />
        </div>
        <div class="w-full">

            <label for="title">Select</label>
            <select v-model="title.titleId" class="border w-full rounded-md p-1 outline-none">
                <option disabled value="">Please Select</option>
                <option 
                v-for="title in titleStore.titles" 
                :key="title.id" 
                :value="title.id"
                >{{ title.name }}</option>
            </select>
            
        </div>
        <div class="w-full flex justify-end items-center gap-2">
            <router-link :to="{ name : 'members' }" class="border p-2 rounded-md">Cancel</router-link>
            <buttonComp buttonName="Save" type="submit"/>
        </div>
    </form>
   </div>
    
</template>