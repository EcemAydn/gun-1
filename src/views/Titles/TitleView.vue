<script setup>
import inputComp from '../../components/input.vue';
import buttonComp from '../../components/button.vue';
import navbarComp from '../../components/navbar.vue';
import modalComp from '../../components/modal.vue';
import { useTitleStore } from '../../stores/titles'
import { useAlertStore } from '@/stores/alert';
import { useModalStore } from '@/stores/modal';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const title = ref({
    name:null,
    description:null,
});
const router = useRouter();
const isLoading = ref(true);
const titleStore = useTitleStore();
const alertStore = useAlertStore();
const modalStore = useModalStore();

titleStore.getTitles().finally(() => {
    isLoading.value = false;
})

function deleteButton(a){
  titleStore.deleteTitle(a)
  .then(() => {
    alertStore.addAlert({ message: 'Deleted!', color: 'success' });
  })
  .catch(() => {
    alertStore.addAlert({ message: 'Error!', color: 'error' });
  })
}

function saveButton(){
    titleStore.createTitle({id: new Date().getTime(), name: title.value.name, description: title.value.description})
    .then(() => {
    alertStore.addAlert({ message: 'Created!', color: 'success' });
    })
    .catch(() => {
    alertStore.addAlert({ message: 'Error!', color: 'error' });
    })
}




</script>
<template>
  <!-- <modalComp title="Create Title" @submit.prevent="saveButton()">
      <inputComp class="mb-4" label="Name"/>
      <inputComp label="Description"/>
  </modalComp> -->
  <navbarComp />
  <div class="px-2 md:px-8 rounded-md mb-16 w-full sm:w-4/5 overflow-hidden h-full ">
    <div v-if="!isLoading" class="flex flex-col items-end overflow-x-auto sm:-mx-6 lg:-mx-8 h-full px-6 pt-4 pb-6 gap-2">

      <router-link 
          class="bg-green-500 p-1 pl-4 pr-4 rounded-md text-white shadow-inner hover:shadow-none hover:bg-green-600 hover:transition hover:duration-500" 
          :to="{ name: 'createTitle' }">
          + Yeni kayıt oluştur
        </router-link>

        <div class="h-full w-full overflow-auto rounded-xl">
          <table class="min-w-full text-center">
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
                  Edit
                </th>
                
              </tr>
            </thead>  

            <tbody>
              <tr
                v-for="title in titleStore.titles" 
                :key="title.id"
                class="text-xs bg-white border-b opacity-70 transition duration-300 ease-in-out hover:opacity-100 hover:bg-gray-100 even:bg-gray-100 last:border-b-0"
              >
                <td class="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ title.id }}
                </td>
                <td class="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ title.name }}
                </td>
                <td class="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ title.description }}
                </td>
                
                <td class=" text-md font-light whitespace-nowrap">
                    <buttonComp buttonName="Edit" class="font-normal pr-8 bg-transparent text-blue-500" @click=""/>
                    
                    <buttonComp buttonName="Delete" class="bg-transparent p-0 text-red-500" @click="deleteButton(title.id)" />
                    
                </td>
                
              </tr>
            </tbody>
          </table>
        </div>
    </div>
    <div v-else class="loader"> </div>
    </div>
</template>

