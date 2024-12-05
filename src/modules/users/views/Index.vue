<script setup>
import { ref, reactive } from 'vue'
import PageHeader from '../../../components/PageHeader.vue'
import UserModal from '../components/UserModal.vue'
import usersServices from '../services/users'

const loading = ref(true)
const modalOpend = ref(false)
const modalType = ref('')
const textSearch = ref('')

const users = reactive([])

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

const openCreateModal = () => {
  modalOpend.value = true
  modalType.value = 'create'
}

getAllUsers()
</script>

<template>
  <div>
    <PageHeader title="Users" />

    <div class="flex justify-between mb-4">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search"
        v-model="textSearch"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
      />

      <router-link
        to="/users/create"
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
              v-for="i in users"
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
                <button
                  href="#"
                  class="font-medium text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  href="#"
                  class="font-medium text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <UserModal v-if="modalOpend" />
  </div>
</template>
