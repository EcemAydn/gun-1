<script setup>
import inputComp from '@/components/input.vue'
import buttonComp from '@/components/button.vue'
import navbarComp from '../../components/navbar.vue';
import { useMissionsStore } from '../../stores/missions';
import { useMembersStore } from '../../stores/members'
import { useProjectStore } from '../../stores/projects'
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import moment from 'moment';

const missionStore = useMissionsStore();
const memberStore = useMembersStore();
const projectStore = useProjectStore();
const router = useRouter();
const route = useRoute();
const memberProject = ref({
  description: '',
  member_id: '',
  project: '',
  target_date:'',
  delivery_date: '', 
  status: '', 
});



memberStore.getMembers();
projectStore.getProjects();

onMounted(async () => {
  await missionStore.getMissions();
  if (route.params.id) {
    // memberProject.value = {
    //   ...missionStore.getMissionById(route.params.id),
    //   title_id: missionStore.getMissionById(route.params.id).title.id,
    // }
    // delete memberProject.value.title;
    memberProject.value = missionStore.getMissionById(route.params.id);
    memberProject.value.member_id = memberProject.value.member.id;
    console.log('test');

  } else {
    console.log('test olmadı');
  }
})

function updateButton() {
  missionStore.updateMission({
        id: route.params.id,
        project_id: memberProject.value.project,
        member_id: memberProject.value.member_id,
        description: memberProject.value.description,
        delivery_date: moment(memberProject.value.delivery_date).format('YYYY-MM-DD HH:mm:ss') ,
        target_date: moment(memberProject.value.target_date).format('YYYY-MM-DD HH:mm:ss') ,
        status: memberProject.value.status,
        
      });
  router.push({ name: 'missions' })

}
// {name : nameTitle.value.name, description : nameTitle.value.description}
</script>
<template>
  <navbarComp />
  <div class="w-full h-full flex items-center justify-center font-thin">
    <form action="" @submit.prevent="updateButton"
      class="flex flex-col w-4/5 md:w-1/3 items-center border rounded-md p-10 gap-8">
      <h1 class="text-xl">Update Mission</h1>
      <div class="w-full flex flex-col gap-2">
        <inputComp class="bg-gray-50" v-model="memberProject.description" label="Descripiton" />
        <label for="">Member</label>
        <select 
          v-model="memberProject.member_id" 
          class="bg-gray-50 border w-full rounded-md p-1 outline-none"
          >
          <option disabled value="">Please Select</option>
          <option 
            v-for="member in memberStore.members" 
            :key="member.id" 
            :value="member.id"
            >{{ member.name }}</option>
        </select>
        <label for="">Project</label>
        <select 
          v-model="memberProject.project" 
          class="bg-gray-50 border w-full rounded-md p-1 outline-none"
          >
          <option disabled value="">Please Select</option>
          <option 
            v-for="project in projectStore.projects" 
            :key="project.id" 
            :value="project.id"
            >{{ project.name }}</option>
        </select>
        <div class=" w-full flex flex-col gap-2">
            <inputComp type="date" v-model="memberProject.target_date" label="Target Date" class="mb-2 bg-gray-50" />
        </div>
        <div class="w-full flex flex-col gap-2">
            <inputComp type="date" v-model="memberProject.delivery_date" label="Delivery Date" class="mb-2 bg-gray-50" />
        </div>
        <inputComp class="bg-gray-200" v-model="memberProject.status" label="Status" readonly />

      </div>
      <div class="w-full flex items-center justify-end gap-2">
        <router-link :to="{ name: 'missions' }" class="border p-2 rounded-md">Cancel
        </router-link>
        <buttonComp buttonName="Update" type="submit" />
      </div>
    </form>
  </div>
</template>