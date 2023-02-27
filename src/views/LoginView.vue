<script setup>
import inputComp from '../components/input.vue';
import buttonComp from '../components/button.vue';
import { useLoginStore } from '../stores/login'
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const userStore = useLoginStore();
const router = useRouter();
const userList = ref({
  email:null,
  password:null
});
const isLoading= ref(false)

function signIn() {
  isLoading.value = true
  userStore.addUser({email:userList.value.email, password:userList.value.password})
  .then((ups)=> {
    console.log(ups);
    router.push({ name: "title"})
    
  }).catch((bla)=> {
    console.log(bla);
  })
  .finally(()=> {
    isLoading.value = false
    
  })
}
userStore.getUser();

</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center text-sm gap-6 bg-purple-100">
    <div class="p-8 bg-purple-400 rounded-full border-4 border-purple-300 shadow-md"></div>

    <div class="flex flex-col items-center gap-1">
      <h1
      v-if="!isLoading" 
      class="text-3xl font-semibold ">Sign in to your account</h1>
      <h1 
      v-else
      class="text-3xl font-semibold ">Loading</h1>
      <p class="text-sm">Or  <a href="#" class="text-blue-600"> start your 14-day free trial</a></p>
    </div>

    <div class="bg-white rounded-lg shadow-md p-10 w:2/3 md:w-1/3">
      <form @submit.prevent="signIn" class="flex flex-col gap-3">
        <inputComp v-model="userList.email" autocomplete="email" type="email" label="Email"/>
        <inputComp v-model="userList.password" autocomplete="current-password" type="password" label="Password"/>

        <div class="flex justify-between">
          <div>
            <input type="checkbox" id="rem">
            <label for="rem" class="pl-0 md:pl-1 lg:pl-2">Remember me</label>
          </div>
          <a href="#" class="text-blue-600 ">Forgot your password?</a>
        </div>

        <buttonComp type="submit" buttonName="Sign in" />

        <div class="flex items-center justify-center">
            <hr aria-hidden="true" class="w-full">

            <p class="text-gray-500 text-xs w-full text-center">Or continue with</p>

            <hr aria-hidden="true" class="w-full" >
        </div>
        <div class="w-full grid grid-cols-3 gap-1">
          <buttonComp buttonName="fb"/>
          <buttonComp buttonName="tw" />
          <buttonComp buttonName="git" />
        </div>
          <!-- <label for="mail">Email adress</label>
          <input id="mail" type="mail" class="border p-1 rounded-md outline-none" required>

          <label for="pass">Password</label>
          <input id="pass" type="password" class="border p-1 rounded-md outline-none" required>

          <div class="flex justify-between">
            <div>
              <input type="checkbox" id="rem">
              <label for="rem" class="pl-2">Remember me</label>
            </div>

            <a href="#" class="text-blue-600">Forgot your password?</a>
          </div>

          <button type="submit" class="bg-purple-400 text-white p-2 rounded-md mt-4">Sign in</button>

          <div class="flex items-center justify-center">
            <hr aria-hidden="true" class="w-full">

            <p class="text-gray-500 text-xs w-full text-center">Or continue with</p>

            <hr aria-hidden="true" class="w-full" >
          </div>

          <div class="w-full flex gap-1">
            <button class="border rounded-md p-2 px-14">fb</button>
            <button class="border rounded-md p-2 px-14">tw</button>
            <button class="border rounded-md p-2 px-14">git</button>
          </div> -->
      </form>
    </div>
  </div>
</template>