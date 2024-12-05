<script setup>
import PageHeader from '../../../components/PageHeader.vue'

const stats = [
  { title: 'Total Users', value: 2345 },
  { title: 'New Users This Month', value: 678 },
  { title: 'Active Users', value: 8912 },
  { title: 'Bounce Rate', value: '23.4%' },

  { title: 'Total Sales', value: '$3,456' },
  { title: 'Sales This Month', value: '$9,876' },
  { title: 'Conversion Rate', value: '4.8%' },
  { title: 'Refunds Issued', value: 25 },

  { title: 'Total Revenue', value: '$4,567' },
  { title: 'Revenue This Month', value: '$9,765' },
  { title: 'Recurring Revenue', value: '$1,345' },
  { title: 'Growth Rate', value: '7.8%' },

  { title: 'Tasks Completed', value: 345 },
  { title: 'Pending Tasks', value: 56 },
  { title: 'Overdue Tasks', value: 12 },
  { title: 'Upcoming Deadlines', value: 8 }
]
</script>

<template>
  <PageHeader title="Dashboard" />

  <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    <div
      v-for="(i, index) in stats"
      :key="index"
      class="flex flex-col p-6 text-center rounded-lg bg-white shadow-lg cursor-pointer transition-all hover:scale-105"
    >
      <span class="text-4xl font-bold text-gray-700">
        {{ i.value }}
      </span>
      <span class="text-lg leading-6 font-medium text-gray-500 mt-2">
        {{ i.title }}
      </span>
    </div>
  </div>
</template>
