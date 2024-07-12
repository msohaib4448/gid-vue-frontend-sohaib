<template>
  <h1 className="form-heading">{{ formHeading }}</h1>
  <el-form
    style="max-width: 1280px; width: 600px"
    :model="submitForm"
    label-width="auto"
    :label-position="labelPosition"
    :size="size"
  >
    <el-form-item
      label="Name"
      :rules="[
        {
          required: true
        }
      ]"
    >
      <el-input v-model="submitForm.name" />
    </el-form-item>
    <el-form-item
      label="Email Address"
      :rules="[
        {
          required: true,
          type: 'email'
        }
      ]"
    >
      <el-input v-model="submitForm.email" />
    </el-form-item>
    <el-form-item label="Phone Number">
      <el-input v-model="submitForm.phone" />
    </el-form-item>
    <el-form-item label="Address">
      <el-input v-model="submitForm.address" />
    </el-form-item>
    <el-form-item label="Profession">
      <el-select v-model="submitForm.profession" placeholder="Please select your profession">
        <el-option label="Student" value="Student" />
        <el-option label="Job Holder" value="Job Holder" />
      </el-select>
    </el-form-item>
    <el-form-item label="Gender">
      <el-radio-group v-model="submitForm.gender">
        <el-radio value="Male" name="gender"> Male </el-radio>
        <el-radio value="Female" name="gender"> Female </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item style="align-content: flex-end">
      <div className="form-actions">
        <h1 class="form-title">Form Actions:</h1>
        <div class="button-group">
          <el-button @click="onCancel">Cancel</el-button>
          <el-button type="primary" @click="onSubmit">{{
            editMode ? 'Update' : 'Create'
          }}</el-button>
        </div>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const router = useRouter()

const size = ref('default')
const labelPosition = ref('right')
const formHeading = ref('Add User')

const initialState = userStore.selectedUser

const editMode = computed(() => (initialState?.id ? true : false))

watchEffect(() => {
  formHeading.value = editMode.value ? 'Edit User' : 'Add User'
})

const submitForm = reactive({
  id: editMode.value ? initialState.id : null,
  name: initialState.name || '',
  email: initialState.email || '',
  phone: initialState.phone || '',
  address: initialState.address || '',
  profession: initialState.profession || '',
  gender: initialState.gender || ''
})

// async function onSubmit() {
//   const { id, ...updatedUser } = submitForm

//   const isValid = isValidForm()

//   if (isValid) {
//     if (editMode.value && id) {
//       await userStore.updateUser(submitForm)

//     } else {
//       await userStore.addUser(updatedUser)
//     }
//     await userStore.fetchUsers()
//     router.push('/')
//   }
// }

async function onSubmit() {
  const { id, ...updatedUser } = submitForm

  const isValid = isValidForm()

  if (isValid) {
    try {
      if (editMode.value && id) {
        await userStore.updateUser(submitForm)
      } else {
        await userStore.addUser(updatedUser)
      }
      await userStore.fetchUsers()
      router.push('/')
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting the form. Please try again.')
    }
  }
}

function isValidForm() {
  let message = 'please eneter name and email'
  let isValid = false
  if (!!submitForm['name'] && !!submitForm['email']) {
    const isEmailValid = validateEmail(submitForm['email'])
    if (isEmailValid) {
      isValid = true
    } else {
      message = 'please enter valid email'
    }
  }

  return isValid ? true : alert(message)
}

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

function onCancel() {
  router.push('/')
}
</script>

<style scoped>
.el-radio-group {
  margin-right: 12px;
}

.form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.form-title {
  color: black;
  font-size: 18px;
  margin: 0;
  font-style: bold;
}

.form-heading {
  color: black;
  font-size: 24px;
  margin: 0;
  font-style: bold;
  text-align: center;
}

.button-group {
  display: flex;
  gap: 10px;
}
</style>
