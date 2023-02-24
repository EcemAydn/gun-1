<template>
<button 
    :type="type" 
    class="bg-purple-400 text-white p-2 rounded-md mt-4">
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