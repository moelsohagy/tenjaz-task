<script setup>
import { ref, reactive, computed } from 'vue'
import { showAlert } from '../../../utils/sweetalert'
import Swal from 'sweetalert2'
import PageHeader from '../../../components/PageHeader.vue'
import usersServices from '../services/users'

const loading = ref(true)

const filter = reactive({
  name: '',
  status: ''
})
const users = reactive([])

const filteredUsers = computed(() => {
  if (filter.name != '' && filter.status != '')
    return users.filter(
      (i) =>
        `${i.firstName} ${i.lastName}`
          .toLowerCase()
          .includes(filter.name.toLowerCase()) && filter.status == i.status
    )
  else if (filter.name != '')
    return users.filter((i) =>
      `${i.firstName} ${i.lastName}`
        .toLowerCase()
        .includes(filter.name.toLowerCase())
    )
  else if (filter.status != '')
    return users.filter((i) => filter.status == i.status)
  else return users
})

const deleteUser = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      loading.value = true
      usersServices
        .remove(id)
        .then(() => {
          const index = users.findIndex((i) => i.id == id)
          if (index > -1) users.splice(index, 1)
          showAlert('Deleted successfully', 'success')
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}

const getAllUsers = () => {
  loading.value = true

  usersServices
    .getAll()
    .then((response) => {
      // users comes from API not have status, so i add it as static
      users.push(
        ...(response.data?.users?.map((i) => ({
          ...i,
          status: i.id % 2 == 0 ? 'inactive' : 'active'
        })) || [])
      )
    })
    .catch((error) => {
      console.log('error: ', error)
    })
    .finally(() => {
      loading.value = false
    })
}

getAllUsers()
</script>

<template>
  <div>
    <PageHeader title="Users" />

    <div class="flex justify-between mb-4">
      <div class="flex gap-4">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search by name"
          v-model="filter.name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          autocomplete="off"
        />

        <select
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          v-model="filter.status"
        >
          <option value="">Choose status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <router-link
        :to="{ name: 'Users.Create' }"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
      >
        Create User
      </router-link>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <template v-if="loading">
            <tr
              v-for="n in 3"
              :key="n"
              class="bg-white border-b hover:bg-gray-50"
            >
              <th class="px-6 py-4">
                <div class="h-2.5 bg-gray-300 rounded-full w-24"></div>
              </th>
              <td class="px-6 py-4">
                <div class="h-2.5 bg-gray-300 rounded-full w-24"></div>
              </td>
              <td class="px-6 py-4">
                <div class="h-2.5 bg-gray-300 rounded-full w-24"></div>
              </td>
              <td class="px-6 py-4">
                <div class="h-2.5 bg-gray-300 rounded-full w-24"></div>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr
              v-for="i in filteredUsers"
              :key="i.id"
              class="bg-white border-b hover:bg-gray-50"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {{ `${i.firstName} ${i.lastName}` }}
              </th>
              <td class="px-6 py-4">
                {{ i.email }}
              </td>
              <td class="px-6 py-4">
                {{ i.status }}
              </td>
              <td class="flex gap-4 px-6 py-4">
                <router-link
                  :to="{ name: 'Users.Update', params: { id: i.id } }"
                  class="font-medium text-blue-600 hover:underline"
                >
                  Edit
                </router-link>
                <button
                  class="font-medium text-red-600 hover:underline"
                  @click="deleteUser(i.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
