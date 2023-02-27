<template>
    <label 
      :for="forId"
      >{{ label }}</label>
    <input
      :id="forId"
      v-bind="$attrs"
      :type="type"
      @input="(e) => $emit('update:modelValue', e.target.value)"
      :value="modelValue"
      class="border p-1 rounded-md outline-none" 
      required
    />
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const forId = ref(new Date().getTime());

  defineProps({
    modelValue: {
      type: [String, Number],
    },
    type: {
      type: String,
      default: "text"
    },
    label: {
      type: String,
    },
  });
  defineEmits(['update:modelValue'])
  </script>
  