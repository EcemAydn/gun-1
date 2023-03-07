<script setup>
import inputComp from '@/components/input.vue';
import buttonComp from '@/components/button.vue';
import navbarComp from '../../components/navbar.vue';
import { useMissionsStore } from '../../stores/missions';
import { useMembersStore } from '../../stores/members';
import { useProjectStore } from '../../stores/projects';
import { useAlertStore } from '@/stores/alert';
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

memberStore.getMembers()
projectStore.getProjects()




function saveButton(){
    missionStore.createMission({
        member:memberProject.value.member,
        project_id: memberProject.value.project,
        description: memberProject.value.description,
        target_date: moment(memberProject.value.target).format('YYYY-MM-DD HH:mm:ss')
    });
    router.push({ name : 'missions'})
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
        <h1 class="text-xl">Create Mission</h1>
        <div class="w-full flex flex-col gap-2">
            <inputComp v-model="memberProject.description" label="Description" />
        </div>
        <div class="w-full flex flex-col gap-2">

            <label for="member">Member</label>
            <select v-model="memberProject.member" class="border w-full rounded-md p-1 outline-none">
                <option disabled value="">Please Select</option>
                <option 
                v-for="member in memberStore.members" 
                :key="member.id" 
                :value="member.id"
                >{{ member.name }}</option>
            </select>
            
        </div>
        <div class="w-full flex flex-col gap-2">

            <label for="project">Project</label>
            <select v-model="memberProject.project" class="border w-full rounded-md p-1 outline-none">
            <option disabled value="">Please Select</option>
            <option 
                v-for="project in projectStore.projects" 
                :key="project.id" 
                :value="project.id"
            >{{ project.name }}</option>
            </select>

        </div>
        <div class="w-full flex flex-col gap-2">
            <inputComp type="date" v-model="memberProject.target" label="Target Date" class="mb-2" />
        </div>
        <div class="w-full flex justify-end items-center gap-2">
            <router-link :to="{ name : 'missions' }" class="border p-2 rounded-md">Cancel</router-link>
            <buttonComp buttonName="Save" type="submit"/>
        </div>
    </form>
   </div>
    
</template>

<!-- 
    Create update
    project_id
    member_id
    Description
    target_date: date YYYY-MM-DD HH:mm:ss 
-->