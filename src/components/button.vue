<template>
<button 
    :type="type" 
    class="bg-purple-400 p-2 rounded-md font-normal">
    {{ buttonName }}</button>
</template>

<script setup>
defineProps({
   
    type: {
        type: String,
        default:"button"
    },
    buttonName: {
        type: String
    }
})
</script>