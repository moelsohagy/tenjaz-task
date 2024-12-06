<script setup>
import { defineProps } from 'vue'

defineProps({
  modelValue: { type: String, default: '' },
  id: { type: String, default: '' },
  name: { type: String, default: '' },
  label: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false },
  errors: { type: [String, Array], default: '' }
})
</script>

<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block mb-2 text-sm font-medium text-gray-900"
    >
      {{ label }}
    </label>

    <select
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      :id="id"
      :disabled="disabled"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="i in options" :key="`option-${i.value}`" :value="i.value">
        {{ i.label }}
      </option>
    </select>

    <div
      v-if="(Array.isArray(errors) && errors.length) || errors.length"
      class="text-red-500 text-sm"
    >
      {{ Array.isArray(errors) ? errors[0] : errors }}
    </div>
  </div>
</template>
