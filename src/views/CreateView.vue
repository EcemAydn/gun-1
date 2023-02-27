<script setup>
import inputComp from '@/components/input.vue';
import buttonComp from '@/components/button.vue';
import { useLoginStore } from '../stores/login'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useLoginStore();
const title = ref({
    name:null,
    description:null,
});
const router = useRouter();

function saveButton(){
    userStore.createTitle({id: new Date().getTime(), name: title.value.name, description: title.value.description});
    alert('basarili')
    router.push({ name : 'title'});
}

</script>

<template>
   <div class="w-2/3 md:w-1/3">
    <form action="" @submit.prevent="saveButton()" class="flex flex-col items-center bg-white p-10 rounded-md gap-4">
        <h1 class="text-xl">Oluş</h1>
        <div class="w-full flex flex-col gap-2">
            <inputComp v-model="title.name" label="Name" />
            <inputComp v-model="title.description" label="Description" />
        </div>
        <div class="w-full flex justify-end items-center gap-2">
            <router-link :to="{ name : 'title' }" class="border p-2 rounded-md mt-4">IPTAL</router-link>
            <buttonComp buttonName="SAVE" type="submit"/>
        </div>
    </form>
   </div>
    
</template>