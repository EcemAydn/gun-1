<script setup>
import navbarComp from '../../components/navbar.vue';
import buttonComp from '../../components/button.vue';
import { useMembersStore } from '../../stores/members';
import { useModalStore } from '../../stores/modal';
import { useAlertStore } from '@/stores/alert';
import { ref } from 'vue';

const isLoading = ref(true);
const membersStore = useMembersStore();
const modalStore = useModalStore();
membersStore.getMembers().finally(() => {
    isLoading.value = false;
});
const alertStore = useAlertStore();

function deleteButton(id){
  membersStore.deleteMember(id)
  .then(() => {
    alertStore.addAlert({ message: 'Deleted!', color: 'success' });
  })
  .catch(() => {
    alertStore.addAlert({ message: 'Error!', color: 'error' });
  })
}

function createMemberButton(){
  modalStore.addModal({ type: 'member'});
}

function updateMemberButton(item){
  modalStore.addModal({ type:'member', item: { ...item } });
}

</script>

<template>
  <navbarComp />
  <div class="px-2 md:px-8 rounded-md mb-16 w-full sm:w-4/5 overflow-hidden h-full ">
  <div  v-if="!isLoading" class="flex flex-col items-end overflow-x-auto sm:-mx-6 lg:-mx-8 h-full px-6 pt-4 pb-6 gap-2">
    <button 
          class="bg-green-500 p-1 pl-4 pr-4 rounded-md text-white shadow-inner hover:shadow-none hover:bg-green-600 hover:transition hover:duration-500" 
          @click="createMemberButton">
          + Yeni kayıt oluştur
        </button>
        <div class="h-full w-full overflow-auto rounded-xl">
          <table class="min-w-full text-center">
            <thead class="border-b bg-gray-800 sticky top-0 left-0 z-10">
              <tr>
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Title Name
                </th>
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Name
                </th>             
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Edit
                </th>
                
              </tr>
            </thead>

            <tbody class="">
              <tr
                v-for="member in membersStore.members" 
                :key="member.id"
                class="text-xs bg-white border-b opacity-70 transition duration-300 ease-in-out hover:opacity-100 hover:bg-gray-100 even:bg-gray-100 last:border-b-0"
                >
                <td class="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ member.title.name }}
                </td>
                <td class="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ member.name }}
                </td>
                <td class="text-md font-light whitespace-nowrap">
                    <button 
                      @click="updateMemberButton(member)"
                      class="font-normal pr-8 bg-transparent text-blue-500"
                      >Edit
                    </button>
                  <buttonComp buttonName="Delete" class="bg-transparent text-red-500" @click="deleteButton(member.id)" />
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
      <div v-else class="loader"> </div>
    </div>
</template>