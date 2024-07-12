<template>
  <header>
    <h1 style="color: black; text-align: center; margin-bottom: 16px; white-space: nowrap">
      User Actions
    </h1>
    <div class="wrapper">
      <nav>
        <el-button type="primary" @click="onClick" class="nav-button"> Add User </el-button>
      </nav>
    </div>
    <div class="wrapper">
      <nav>
        <el-button type="Secondary" @click="router.push('/admin/queues')" class="nav-button">
          User Queues
        </el-button>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const router = useRouter()

function onClick() {
  userStore.setSelectedUser({
    id: null,
    name: '',
    email: '',
    phone: '',
    address: '',
    profession: '',
    gender: ''
  })
  router.push('/add-user')
}
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

nav {
  display: flex;
  justify-content: center;
}

.nav-button {
  margin: 0 8px;
}
</style>
