<script setup>
import inputComp from '../../components/input.vue';
import buttonComp from '../../components/button.vue';
import navbarComp from '../../components/navbar.vue';
import { useProjectStore } from '../../stores/projects';
import { useAlertStore } from '@/stores/alert';
import { useModalStore } from '../../stores/modal';
import { ref } from 'vue';
import moment from 'moment';

const isLoading = ref(true);
const projectStore = useProjectStore();
const alertStore = useAlertStore();
const modalStore = useModalStore();

projectStore.getProjects().finally(() => {
    isLoading.value = false;
})

function deleteButton(a){
  projectStore.deleteProject(a)
  .then(() => {
    alertStore.addAlert({ message: 'Deleted!', color: 'success' });
  })
  .catch(() => {
    alertStore.addAlert({ message: 'Error!', color: 'error' });
  })
}

function CreateProjectButton(){
  modalStore.addModal('project')
}

</script>
<template>
  <navbarComp />
  <div class="px-2 md:px-8 rounded-md mb-16 w-full sm:w-4/5 overflow-hidden h-full ">
  <div v-if="!isLoading" class="flex flex-col items-end overflow-x-auto sm:-mx-6 lg:-mx-8 h-full px-6 pt-4 pb-6 gap-2">
      <button 
          class="bg-green-500 p-1 pl-4 pr-4 rounded-md text-white shadow-inner hover:shadow-none hover:bg-green-600 hover:transition hover:duration-500" 
          @click="CreateProjectButton">
          + Yeni kayıt oluştur
      </button>
        <div class="h-full w-full overflow-auto rounded-xl">
          <table  class="min-w-full text-center">
            <thead class="border-b bg-gray-800 sticky top-0 left-0 z-10">
              <tr>
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Id
                </th>
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Name
                </th>
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Description
                </th>
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Created
                </th>
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Updated
                </th>
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Edit
                </th>
               
              </tr>
            </thead>

            <tbody class="">
              <tr
                v-for="project in projectStore.projects" 
                :key="project.id"
                class="text-xs bg-white border-b opacity-70 transition duration-300 ease-in-out hover:opacity-100 hover:bg-gray-100 even:bg-gray-100 last:border-b-0"
              >
                <td class="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ project.id }}
                </td>
                <td class="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ project.name }}
                </td>
                <td class="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ project.description }}
                </td>
                <td class="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ moment(project.created_at).format('YYYY/DD/MM HH:mm') }}
                </td>
                <td class="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ moment(project.updated_at).format('YYYY/DD/MM HH:mm') }}
                </td>
                <td class="text-md font-light whitespace-nowrap">
                  <router-link 
                    :to = "{ name: 'UpdateProject', params: { id: project.id} }"
                    class="font-normal pr-8 bg-transparent text-blue-500"
                    >Edit
                  </router-link>
                  <buttonComp buttonName="Delete" class=" bg-transparent text-red-500" @click="deleteButton(project.id)" />
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
      <div v-else class="loader"> </div>
    </div>

</template>