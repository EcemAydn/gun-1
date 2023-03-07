<script setup>
// error warning success info
    defineProps({
        message: String,
        color: {
            type: String,
            default: 'info',
            validator(value) {
                return ['success', 'warning', 'error', 'info'].includes(value.toLocaleLowerCase())
            }
        }
    });
</script>
<template>
    <div
        class="bg-gray-400 p-4 rounded-md font-light text-white"
        :class="{
            'bg-red-500': color.toLocaleLowerCase() === 'error',
            'bg-blue-500': color.toLocaleLowerCase() === 'info',
            'bg-yellow-500': color.toLocaleLowerCase() === 'warning',
            'bg-green-500': color.toLocaleLowerCase() === 'success',
        }"
    >
        {{ message }}
    </div>
</template>