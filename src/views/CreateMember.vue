<script setup>
import inputComp from '@/components/input.vue';
import buttonComp from '@/components/button.vue';
import { useMembersStore } from '../stores/members'
import { useTitleStore } from '../stores/titles'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const memberStore = useMembersStore();
const router = useRouter();
const titleStore = useTitleStore()
const title = ref({
    titleId:'',
    name:''
});
titleStore.getTitles()

function saveButton(){
    memberStore.createMember({id: title.value.titleId, name: title.value.name});
    alert('basarili')
    router.push({ name : 'members'});    
}

</script>

<template>
   <div class="w-2/3 md:w-1/3">
    <form action="" @submit.prevent="saveButton()" class="flex flex-col items-center bg-white p-10 rounded-md gap-4">
        <h1 class="text-xl">Oluş</h1>
        <div class="w-full flex flex-col gap-2">
            <inputComp v-model="title.name" label="Name" />
        </div>
        <div class="w-full">

            <label for="title">Seç</label>
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
            <router-link :to="{ name : 'members' }" class="border p-2 rounded-md mt-4">IPTAL</router-link>
            <buttonComp buttonName="SAVE" type="submit"/>
        </div>
    </form>
   </div>
    
</template>