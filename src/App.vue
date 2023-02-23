<script setup>
import AboutView from '@/views/AboutView.vue';

function signIn() {
  console.log('sign in')
}
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center text-sm gap-6 bg-purple-100">
    <div class="p-8 bg-purple-400 rounded-full border-4 border-purple-300 shadow-md"></div>

    <div class="flex flex-col items-center gap-1">
      <h1 class="text-3xl font-semibold ">Sign in to your account</h1>
      <p class="text-sm">Or  <a href="#" class="text-blue-600"> start your 14-day free trial</a></p>
    </div>

  

    <div class="bg-white rounded-lg shadow-md p-10 w-1/3">
      <form @submit.prevent="signIn" class="flex flex-col gap-3">
       
          <label for="mail">Email adress</label>
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
          </div>
      </form>
    </div>
  </div>
</template>