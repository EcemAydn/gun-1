<script setup>
import inputComp from './input.vue';
import buttonComp from './button.vue';
import { useMissionsStore } from '../stores/missions';
import { useMembersStore } from '../stores/members';
import { useProjectStore } from '../stores/projects';
import { useAlertStore } from '../stores/alert';
import { useModalStore } from '../stores/modal';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import moment from 'moment';


const missionStore = useMissionsStore();
const memberStore = useMembersStore();
const projectStore = useProjectStore();
const router = useRouter();
const route = useRoute();
const memberProject = ref({
    member:'',
    project:'',
    description:'',
    target:'',
});
const alertStore = useAlertStore();
const modalStore = useModalStore();

memberStore.getMembers()
projectStore.getProjects()

function saveButton(){
    missionStore.createMission({
        member:memberProject.value.member,
        project_id: memberProject.value.project,
        description: memberProject.value.description,
        target_date: moment(memberProject.value.target).format('YYYY-MM-DD HH:mm:ss')
    })
    .then(() => {
        modalStore.closeModal();
        alertStore.addAlert({ message: 'Created!', color: 'success' });
    })
    .catch(() => {
        alertStore.addAlert({ message: 'Error!', color: 'error' });
  })
}

function createMemberButton(){
    modalStore.addModal('member');
}

function createProjectButton(){
    modalStore.addModal('project');
}

function closeModalButton(){
    modalStore.closeModal();
}

</script>
<template>
    <form @submit.prevent="saveButton()" class="flex flex-col items-center p-10 gap-4">
        <h1 class="text-xl">Create Mission</h1>
        <div class="w-full flex flex-col gap-2">
            <inputComp v-model="memberProject.description" label="Description" />
        </div>
        <div class="w-full flex flex-col gap-2">

            <label for="member">Member</label>
            <div class="w-full flex gap-2 items-center">
                <select v-model="memberProject.member" class="border w-full rounded-md p-1 outline-none">
                    <option disabled value="">Please Select</option>
                    <option 
                    v-for="member in memberStore.members" 
                    :key="member.id" 
                    :value="member.id"
                    >{{ member.name }}</option>
                </select>
                <buttonComp class="whitespace-nowrap bg-gray-600 text-white" buttonName="Create Member" @click="createMemberButton" />
            </div>
        </div>
        <div class="w-full flex flex-col gap-2">

            <label for="project">Project</label>
            <div class="w-full flex gap-2 items-center">
                <select v-model="memberProject.project" class="border w-full rounded-md p-1 outline-none">
                    <option disabled value="">Please Select</option>
                    <option 
                        v-for="project in projectStore.projects" 
                        :key="project.id" 
                        :value="project.id"
                    >{{ project.name }}</option>
                </select>
                <buttonComp class="whitespace-nowrap bg-gray-600 text-white" buttonName="Create Project" @click="createProjectButton" />
            </div>
        </div>
        <div class="w-full flex flex-col gap-2">
            <inputComp type="date" v-model="memberProject.target" label="Target Date" class="mb-2" />
        </div>
        <div class="w-full flex justify-end items-center gap-2">
            <button @click="closeModalButton" class="border p-2 rounded-md">Cancel</button>            
            <buttonComp buttonName="Save" type="submit"/>
        </div>
    </form>
</template>