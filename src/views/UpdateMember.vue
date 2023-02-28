<script setup>
import inputComp from '@/components/input.vue'
import buttonComp from '@/components/button.vue'
import { useMembersStore } from '../stores/members';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const memberStore = useMembersStore();
const nameTitle = ref({
    id : '',
    title : '',
    name : '',
});
console.log(nameTitle);
const router = useRouter()
const route = useRoute()

onMounted(async() => {
    await memberStore.getMembers();
    if (route.params.id){
        nameTitle.value = memberStore.getMemberById(route.params.id)
        console.log('test');
    } else {
        // console.log('deneme');
        console.log(route.params);
    }
})

function updateButton(){
    memberStore.updateMember(nameTitle.value)
    console.log(nameTitle.value);
    router.push({ name : 'members'})
    
}
// {name : nameTitle.value.name, description : nameTitle.value.description}
</script>
<template>
    <div class="w-2/3 md:w-1/3">
        <form action="" @submit.prevent="updateButton" class="flex flex-col items-center bg-white rounded-md p-10 gap-8">
            <h1 class="text-xl">Update</h1>
            <div class="w-full flex flex-col gap-2">
                <inputComp 
                    v-model="nameTitle.title.name"
                    label="Title Name" />
                <inputComp 
                    v-model="nameTitle.name"
                    label="Name" />
            </div>
            <div class="w-full flex items-center justify-end gap-2">
                <router-link 
                    :to= "{ name : 'members'}"
                    class="border p-2 mt-4 rounded-md"
                    >IPTAL
                </router-link>
                <buttonComp buttonName="Update" type="submit"/>
            </div>
        </form>
    </div>
</template>