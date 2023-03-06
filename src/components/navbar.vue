<template>
    <div class="w-full p-4 flex items-center justify-between md:justify-around">
        <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-400 w-6 h-6 md:hidden">
         <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg> -->
        <div class="w-full flex text-gray-400 gap-4 text-xs md:text-lg font-thin ">
            <RouterLink :to="{ name : 'title'}"  class=" border-b hover:text-gray-800 p-1 md:p-2 md:px-8 hover: duration-500">Titles</RouterLink>
            <RouterLink :to="{ name : 'members'}" class=" border-b hover:text-gray-800 p-1 md:p-2 md:px-8 hover: duration-500">Members</RouterLink>
            <RouterLink :to="{ name : 'projects'}" class=" border-b hover:text-gray-800 p-1 md:p-2 md:px-8 hover: duration-500">Project</RouterLink>
            <RouterLink :to="{ name : 'missions'}" class=" border-b hover:text-gray-800 p-1 md:p-2 md:px-8 hover: duration-500">Missions</RouterLink>
        </div>
        
        <RouterLink :to="{name : 'login'}">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 md:w-6 md:h-6" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
        </RouterLink>
       

    </div>
</template>



<style>
    .router-link-exact-active{
        color: black;
        border-color: black;
    }
</style>