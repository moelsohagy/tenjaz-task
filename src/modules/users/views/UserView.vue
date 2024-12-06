<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showAlert } from '../../../utils/sweetalert'
import PageHeader from '../../../components/PageHeader.vue'
import Spinner from '../../../components/Spinner.vue'
import MainInput from '../../../components/inputs/MainInput.vue'
import MainSelect from '../../../components/inputs/MainSelect.vue'
import usersServices from '../services/users'

const route = useRoute()
const router = useRouter()

const id = route?.params?.id || null
const pageType = route?.meta?.pageType || ''
const pageTitle = route?.meta?.title || ''
const loading = ref(true)
const errors = ref({})

const user = reactive({
  name: '',
  email: '',
  status: ''
})

const statusOptions = [
  { value: '', label: 'Choose status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
]

const disableStatus = computed(() => {
  switch (pageType) {
    case 'create':
    case 'update':
      return false
    default:
      return true
  }
})

function submit() {
  if (!loading.value) {
    loading.value = true
    errors.value = {}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (user.name == '') errors.value.name = 'Name is required'
    if (!emailRegex.test(user.email)) errors.value.email = 'Email is not valid'
    if (user.email == '') errors.value.email = 'Email is required'
    if (user.status == '') errors.value.status = 'Status is required'

    if (Object.keys(errors.value).length > 0) {
      loading.value = false
      return true
    }

    switch (pageType) {
      case 'create':
        create()
        break
      case 'update':
        update()
        break
      default:
        return
    }
  }
}

const create = () => {
  usersServices
    .create(user)
    .then(() => {
      showAlert('Created successfully', 'success')
      router.push({ name: 'Users' })
    })
    .catch((error) => {
      errors.value = error?.response?.data?.errors || {}
    })
    .finally(() => {
      loading.value = false
    })
}
const update = () => {
  usersServices
    .update(id, user)
    .then(() => {
      showAlert('Updated successfully', 'success')
      router.push({ name: 'Users' })
    })
    .catch((error) => {
      errors.value = error?.response?.data?.errors || {}
    })
    .finally(() => {
      loading.value = false
    })
}

const findOne = () => {
  usersServices
    .getOne(id)
    .then((response) => {
      user.name = response?.data?.firstName || ''
      user.email = response?.data?.email || ''
      user.status = 'active'
    })
    .catch((error) => {
      showAlert(error?.response?.data?.message || 'ERROR', 'error')
    })
    .finally(() => {
      loading.value = false
    })
}

watch(
  () => user.name,
  () => delete errors.value.name
)
watch(
  () => user.email,
  () => delete errors.value.email
)
watch(
  () => user.status,
  () => delete errors.value.status
)

if (pageType != 'create') findOne()
else loading.value = false
</script>

<template>
  <PageHeader :title="pageTitle" />

  <form
    @submit.prevent="submit"
    class="xl:w-2/3 border border-gray-200 rounded-lg shadow p-4"
  >
    <div class="grid md:grid-cols-2 gap-4 mb-4">
      <MainInput
        id="name"
        label="Name"
        placeholder="Enter name"
        :disabled="disableStatus"
        :errors="errors.name"
        v-model="user.name"
      />

      <MainInput
        id="email"
        label="Email"
        placeholder="Enter email"
        :disabled="disableStatus"
        :errors="errors.email"
        v-model="user.email"
      />

      <MainSelect
        id="status"
        label="Status"
        placeholder="Enter status"
        :disabled="disableStatus"
        :options="statusOptions"
        :errors="errors.status"
        v-model="user.status"
      />
    </div>

    <div v-if="!disableStatus">
      <button
        type="submit"
        class="flex items-center gap-3 text-white capitalize bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
        :disabled="loading"
      >
        {{ pageType }}
        <Spinner v-if="loading" />
      </button>
    </div>
  </form>
</template>
