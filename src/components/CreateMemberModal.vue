<script setup>
import inputComp from '../components/input.vue';
import buttonComp from '../components/button.vue';
import { useMembersStore } from '../stores/members'
import { useTitleStore } from '../stores/titles';
import { useAlertStore } from '../stores/alert';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useModalStore } from '../stores/modal';

const memberStore = useMembersStore();
const router = useRouter();
const titleStore = useTitleStore()
const title = ref({
    titleId:'',
    name:''
});
const alertStore = useAlertStore();
const modalStore = useModalStore();

titleStore.getTitles()

function saveButton(){
    memberStore.createMember({id: title.value.titleId, name: title.value.name})
    .then(() => {
        modalStore.closeModal();
        alertStore.addAlert({ message: 'Created!', color: 'success' });
    })
    .catch(() => {
        alertStore.addAlert({ message: 'Error!', color: 'error' });
    })    
}

function createTitleButton(){
    modalStore.addModal('title');
}

function closeModalButton(){
    modalStore.closeModal();
}

</script>
<template>

    <form @submit.prevent="saveButton()" class="flex flex-col items-center p-10 gap-4">
        <h1 class="text-xl">Create Member</h1>
        <div class="w-full flex flex-col gap-2">
            <inputComp v-model="title.name" label="Name" />
        </div>
        <div class="w-full">
            
            <label for="title">Title</label>
            <div class="w-full flex gap-2 items-center">
                <select v-model="title.titleId" class="border w-full rounded-md p-1 outline-none">
                    <option disabled value="">Please Select</option>
                    <option 
                    v-for="title in titleStore.titles" 
                    :key="title.id" 
                    :value="title.id"
                    >{{ title.name }}</option>
                </select>
                <buttonComp class="whitespace-nowrap bg-gray-600 text-white" buttonName="Create Title" @click="createTitleButton" />
            </div>
                
        </div>
        <div class="w-full flex justify-end items-center gap-2">
            <button @click="closeModalButton" class="border p-2 rounded-md">Cancel</button>
            <buttonComp buttonName="Save" type="submit"/>
        </div>
    </form>
</template>