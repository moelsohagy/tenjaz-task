<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showAlert } from '../../../utils/sweetalert'
import PageHeader from '../../../components/PageHeader.vue'
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
  status: true
})

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
      user.status = true
    })
    .catch((error) => {
      showAlert(error?.response?.data?.message || 'ERROR', 'error')
    })
    .finally(() => {
      loading.value = false
    })
}

if (pageType != 'create') findOne()
else loading.value = false
</script>

<template>
  <PageHeader :title="pageTitle" />

  <form @submit.prevent="submit">
    <div>
      <input
        v-model="user.name"
        id="name"
        label="Name"
        placeholder="Enter name"
        :disabled="disableStatus"
      />
    </div>

    <div>
      <button
        type="submit"
        class="text-white capitalize bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
      >
        {{ pageType }}
      </button>
    </div>
  </form>
</template>
