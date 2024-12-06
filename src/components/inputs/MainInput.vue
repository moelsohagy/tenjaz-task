<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  id: { type: String, default: '' },
  name: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  autocomplete: { type: Boolean, default: false },
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

    <input
      :type="type ? type : 'text'"
      :id="id"
      :name="name || id"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :autocomplete="autocomplete ? 'on' : 'off'"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <div
      v-if="(Array.isArray(errors) && errors.length) || errors.length"
      class="text-red-500 text-sm"
    >
      {{ Array.isArray(errors) ? errors[0] : errors }}
    </div>
  </div>
</template>
