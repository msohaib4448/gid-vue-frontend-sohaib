<template>
  <el-table v-loading="loading" :data="allUsers" style="width: 100%">
    <el-table-column prop="name" label="Name" width="140" />
    <el-table-column prop="email" label="Email" width="200" />
    <el-table-column prop="address" label="Address" width="240" />
    <el-table-column prop="phone" label="Phone" width="140" />
    <el-table-column prop="gender" label="Gender" width="140" />
    <el-table-column prop="profession" label="Profession" width="140" />
    <el-table-column label="Actions" width="160">
      <template #default="{ row }">
        <el-icon
          style="cursor: pointer; margin-right: 10px"
          size="22"
          @click="handleEdit(row)"
          color="gray"
        >
          <Edit />
        </el-icon>
        <el-icon style="cursor: pointer" size="22" @click="handleDelete(row)" color="red">
          <Delete />
        </el-icon>
      </template>
    </el-table-column>
  </el-table>
  <el-empty v-if="!loading && allUsers.length === 0" description="No Data"></el-empty>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const loading = ref(true)
const allUsers = ref()
const error = ref(null)

const userStore = useUserStore()

const router = useRouter()

async function fetchData() {
  allUsers.value = []
  error.value = null
  loading.value = true

  try {
    allUsers.value = await userStore.fetchUsers()
  } catch (err: any) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchData()
})

async function handleDelete(row: any) {
  try {
    const result = await userStore.deleteUser(row?.id)
    await fetchData()
  } catch (err: any) {
    error.value = err.toString()
  }
}

function handleEdit(row: any) {
  userStore.setSelectedUser({ ...row })
  router.push('/edit-user')
}
</script>
