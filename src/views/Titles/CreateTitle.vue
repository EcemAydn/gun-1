<script setup>
import inputComp from '@/components/input.vue';
import buttonComp from '@/components/button.vue';
import navbarComp from '../../components/navbar.vue';
import { useTitleStore } from '../../stores/titles';
import { useAlertStore } from '@/stores/alert';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const titleStore = useTitleStore();
const alertStore = useAlertStore();

const title = ref({
    name:null,
    description:null,
});
const router = useRouter();

function saveButton(){
    titleStore.createTitle({id: new Date().getTime(), name: title.value.name, description: title.value.description});
    router.push({ name : 'title'})
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
                <h1 class="text-xl">Create Title</h1>
                <div class="w-full flex flex-col gap-2">
                    <inputComp v-model="title.name" label="Name" />
                    <inputComp v-model="title.description" label="Description" />
                </div>
                <div class="w-full flex justify-end items-center gap-2">
                    <router-link :to="{ name : 'title' }" class="border p-2 rounded-md">Cancel</router-link>
                    <buttonComp buttonName="SAVE" type="submit"/>
                </div>
            </form>
        </div>
    
</template>