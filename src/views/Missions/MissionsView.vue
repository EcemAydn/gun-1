<script setup>
import navbarComp from '../../components/navbar.vue';
import buttonComp from '../../components/button.vue';
import { useMissionsStore } from '../../stores/missions'
import { useProjectStore } from '../../stores/projects';
import { useAlertStore } from '@/stores/alert';
import { useModalStore } from '../../stores/modal';
import { ref, onMounted } from 'vue';
import moment from 'moment';

const useProject = useProjectStore();
const isLoading = ref(true);
const missionsStore = useMissionsStore();
missionsStore.getMissions().finally(() => {
    isLoading.value = false;
})
const alertStore = useAlertStore();
const modalStore = useModalStore();

function deleteButton(a){
    missionsStore.deleteMission(a)
    .then(() => {
      alertStore.addAlert({ message: 'Deleted!', color: 'success' });
    })
    .catch(() => {
      alertStore.addAlert({ message: 'Error!', color: 'error' });
    })
}

function CreateMissionButton(){
  modalStore.addModal({type: 'mission'});
}

function updateMissionButton(item){
  modalStore.addModal({ type: 'mission', item: { ...item }})
}

</script>

<template>
  <navbarComp />
  <div class="px-2 md:px-8 rounded-md mb-16 w-full sm:w-4/5 overflow-hidden h-full">
  <div v-if="!isLoading" class="flex flex-col items-end overflow-x-auto sm:-mx-6 lg:-mx-8 h-full px-6 pt-4 pb-6 gap-2">
    <button 
          class="bg-green-500 p-1 pl-4 pr-4 rounded-md text-white shadow-inner hover:shadow-none hover:bg-green-600 hover:transition hover:duration-500" 
          @click="CreateMissionButton">
          + Yeni kayıt oluştur
        </button>
        <div class="h-full w-full overflow-auto rounded-xl ">
          <table class="min-w-full text-center">
            <thead class="border-b bg-gray-800 sticky top-0 left-0 z-10">
              <tr>
                
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Project Name
                </th>         
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Description
                </th>
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Member Name
                </th>     
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Delivery Date
                </th>      
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Status
                </th>    
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Target Date
                </th>    
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Edit
                </th>
                
              </tr>
            </thead>

            <tbody class="">
              <tr
                v-for="mission in missionsStore.missions" 
                :key="mission.id"
                class="text-xs bg-white border-b opacity-70 transition duration-300 ease-in-out hover:opacity-100 hover:bg-gray-100 even:bg-gray-100 last:border-b-0"
                >
                <td class="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ mission.project }}
                </td>
                <td class="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ mission.description }}
                </td>
                <td class="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ !mission.member ? '-' : mission.member.name }}
                </td>
                <td class="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{mission.delivery_date === null ? '-' : moment(mission.delivery_date).format('YYYY-MM-DD HH:mm:ss') }}
                </td>
                <td class="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ mission.status }}
                </td>
                <td class="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ moment(mission.target_date).format('YYYY-MM-DD HH:mm:ss') }}
                </td>
                <td class="text-md font-light whitespace-nowrap">
                    <button 
                      @click = "updateMissionButton(mission)"
                      class="font-normal pr-8 bg-transparent text-blue-500"
                      >Edit
                    </button>
                  <buttonComp buttonName="Delete" class="bg-transparent text-red-500" @click="deleteButton(mission.id)" />
                </td>
              </tr>
            </tbody>
          </table>

         </div>
        </div>
        <div v-else class="loader"> </div>
      </div>
</template>