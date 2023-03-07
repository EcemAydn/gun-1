<script setup>
import inputComp from '@/components/input.vue'
import buttonComp from '@/components/button.vue'
import navbarComp from '../../components/navbar.vue';
import { useMembersStore } from '../../stores/members';
import { useTitleStore } from '../../stores/titles';
import { useAlertStore } from '@/stores/alert';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const memberStore = useMembersStore();
const titleStore = useTitleStore()
const titleList = ref({
  id: '',
  title: '',
  name: ''
});
const alertStore = useAlertStore();

titleStore.getTitles()
const router = useRouter()
const route = useRoute()

onMounted(async () => {
  await memberStore.getMembers();
  if (route.params.id) {
    titleList.value = memberStore.getMemberById(route.params.id)
  } else {
    console.log('deneme');
    console.log(route.params);
  }

  console.log(titleList.value)
})

function updateButton() {
  memberStore.updateMember(titleList.value)
  router.push({ name: 'members' })
  .then(() => {
    alertStore.addAlert({ message: 'Updated!', color: 'success' });
  })
  .catch(() => {
    alertStore.addAlert({ message: 'Error!', color: 'error' });
  })

}
// {name : nameTitle.value.name, description : nameTitle.value.description}
</script>
<template>
  <navbarComp />
  <div class="w-full h-full flex items-center justify-center">
    <form action="" @submit.prevent="updateButton"
      class="flex flex-col w-2/3 md:w-1/3 items-center bg-white rounded-md p-10 gap-8">
      <h1 class="text-xl">Update Member</h1>
      <div class="w-full flex flex-col gap-2">
        <label for="title">Title</label>
        <select v-model="titleList.title.id" class="border w-full rounded-md p-1 outline-none">
          <option disabled value="">Please Select</option>
          <option v-for="title in titleStore.titles" :key="title.id" :value="title.id">{{ title.name }}</option>
        </select>
        <inputComp v-model="titleList.name" label="Name" />
      </div>
      <div class="w-full flex items-center justify-end gap-2">
        <router-link :to="{ name: 'members' }" class="border p-2 rounded-md">Cancel
        </router-link>
        <buttonComp buttonName="Update" type="submit" />
      </div>
    </form>
  </div>
</template>