<script setup>
import { useMembersStore } from '../stores/members'
import { ref } from 'vue';


const isLoading = ref(true);
const membersStore = useMembersStore();
membersStore.getMembers().finally(() => {
    isLoading.value = false;
})

function deleteButton(a){
    membersStore.deleteMember(a)
}

</script>

<template>
  <div class="flex flex-col items-end overflow-x-auto sm:-mx-6 lg:-mx-8 h-full px-6 pt-4 pb-6">
    <router-link 
          class="bg-green-500 p-1 pl-4 pr-4 rounded-md text-white shadow-inner hover:shadow-none hover:bg-green-600 hover:transition hover:duration-500" 
          :to="{ name: 'createMember' }">
          + Yeni kayıt oluştur
        </router-link>
        <div class="h-full w-full overflow-auto">
          <table v-if="!isLoading" class="min-w-full">
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
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                  Delete
                </th>
              </tr>
            </thead>

            <tbody class="">
              <tr
                v-for="member in membersStore.members" 
                :key="member.id"
                class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 even:bg-gray-50 last:border-b-0"
                >
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ member.title.name }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ member.name }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <router-link 
                      :to = "{ name: 'UpdateMember', params: { id: member.id} }"
                      class="bg-blue-500 text-white p-1 pl-4 pr-4 shadow-inner rounded-md hover:shadow-lg"
                      >Edit
                    </router-link>
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <button class="bg-red-500 text-white p-1 pl-4 pr-4 shadow-inner rounded-md hover:shadow-lg" @click="deleteButton(member.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-else class="text-4xl font-bold">Loading</div>
        </div>
      </div>
</template>